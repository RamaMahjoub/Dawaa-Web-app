import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import TextField from "../../components/TextField/TextField";
import { PlusLg, Search } from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import { useMediaQuery } from "react-responsive";
import IconButton from "../../components/Button/IconButton";
import StoreCard from "./StoreCard";
import Header, { HeaderTypes } from "../../components/Header/Header";
import AddStore from "./AddStore/AddStore";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getAllStores,
  selectAddStoreStatus,
  selectAllStoresData,
  selectAllStoresStatus,
} from "../../redux/storeSlice";
import PendingDialog from "./AddStore/PendingDialog";

const AllStores = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllStoresData);
  let content;
  const status = useAppSelector(selectAllStoresStatus);
  const addStoreStatus = useAppSelector(selectAddStoreStatus);
  const [open, setOpen] = useState<boolean>(false);
  const [openPending, setOpenPending] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);
  const handleOpenPending = useCallback(() => {
    setOpenPending((pre) => !pre);
  }, []);
  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);
  useEffect(() => {
    if (addStoreStatus === "succeeded") {
      setOpen(false);
      setOpenPending(true);
    }
  }, [addStoreStatus]);
  if (status === "loading") {
    content = <div>loading...</div>;
  } else if (status === "succeeded") {
    content =
      data.data.length > 0
        ? data.data.map((row: any, index: number) => (
            <StoreCard storeData={row} index={index + 1} key={row.id} />
          ))
        : "لا يوجد عناصر";
  } else if (status === "idle") {
    content = "لا يوجد عناصر";
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header
          title={title!}
          action={
            <>
              <TextField
                startIcon={<Search />}
                placeholder="بحث"
                inputSize="medium"
              />
              {isMobile ? (
                <IconButton
                  color="base-blue"
                  icon={<PlusLg style={{ fontSize: "21px" }} />}
                  onClick={handleOpen}
                />
              ) : (
                <Button
                  variant="base-blue"
                  disabled={false}
                  icon={<PlusLg style={{ fontSize: "15px" }} />}
                  start
                  text="مخزن جديد"
                  size="med"
                  onClick={handleOpen}
                />
              )}
            </>
          }
          leftSpace={HeaderTypes.DISTRIPUTE}
        />
        <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter p-large gap-large">
          {content}
        </div>
      </div>
      <AddStore open={open} handleOpen={handleOpen} />
      <PendingDialog open={openPending} handleOpen={handleOpenPending} />
    </>
  );
};

export default AllStores;
