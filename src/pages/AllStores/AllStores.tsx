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
import { getAllStores, selectData, selectStatus } from "../../redux/storeSlice";

const AllStores = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);
  console.log("data", data)
  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);
  const storesList = data.map((row: any) => (
    <StoreCard storeData={row} key={row.id} />
  ));
  return (
    <>
      <div className="h-screen flex flex-col">
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
        <div className="flex-1 bg-greyScale-lighter overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter p-large gap-large flex flex-col">
          {storesList}
        </div>
      </div>
      <AddStore open={open} handleOpen={handleOpen} />
    </>
  );
};

export default AllStores;
