import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Button from "../../components/Button/Button";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { useCallback, useEffect, useState } from "react";
import StoreDialog from "./StoreDialog";
import Header, { HeaderTypes } from "../../components/Header/Header";
import ReturnRequest from "./ReturnRequest/ReturnRequest";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  findWarehouseOnlyMedicines,
  selectWarehouseOnlyMedicinesData,
  selectWarehouseOnlyMedicinesStatus,
} from "../../redux/medicineSlice";
import { useOpenToggle } from "../../hooks/useOpenToggle";
import { usePagination } from "../../hooks/usePagination";
const Albuterol = require("./../../assets/medicines/Albuterol.jpg");
const StoreMedicines = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { pageIndex, pageSize, handlePgination }= usePagination(10);
  const [medicinetoStore, setMedicineToStore] = useState<any>({});
  const { open: openStore, handleOpen: handleOpenStore } = useOpenToggle();
  const handleOpen = useCallback((medicine?: any) => {
    setMedicineToStore(medicine);
    handleOpenStore();
  }, [handleOpenStore]);
  const { open: openReturn, handleOpen: handleOpenReturn } = useOpenToggle();

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectWarehouseOnlyMedicinesData);
  const status = useAppSelector(selectWarehouseOnlyMedicinesStatus);
  let content,
    totalCount = 0;
  useEffect(() => {
    dispatch(
      findWarehouseOnlyMedicines({
        limit: String(pageSize),
        page: String(pageIndex),
      })
    );
  }, [dispatch, pageIndex, pageSize]);
  if (status === "loading") {
    content = <div>loading...</div>;
  } else if (status === "succeeded") {
    totalCount = data.totalRecords;
    content =
      data.data.length > 0
        ? data.data.map((row: any) => (
            <MedicineCard
              key={row.id}
              name={row.name}
              category={"any"}
              photoAlt={row.name}
              photoSrc={Albuterol}
              subtitle={"any"}
              action={
                <Button
                  variant="secondary-light"
                  disabled={false}
                  text="تخزين"
                  size="med"
                  onClick={() => handleOpen(row)}
                />
              }
            />
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
            <Button
              text="طلب إرجاع"
              variant="base-blue"
              disabled={false}
              size="lg"
              onClick={handleOpenReturn}
            />
          }
          leftSpace={HeaderTypes.FREE}
        />
        <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large p-large scrollbar-thin">
          <div className="flex flex-col w-full h-full bg-white p-large max-h-fit rounded-small">
            <div className="flex-1 h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
              {content}
            </div>
            <CustomPagination
              page={pageIndex + 1}
              count={totalCount}
              onChange={handlePgination}
              pageSize={pageSize}
            />
          </div>
        </div>
      </div>
      <StoreDialog
        open={openStore}
        medicine={medicinetoStore}
        handleOpen={handleOpen}
      />
      <ReturnRequest open={openReturn} handleOpen={handleOpenReturn} />
    </>
  );
};

export default StoreMedicines;
