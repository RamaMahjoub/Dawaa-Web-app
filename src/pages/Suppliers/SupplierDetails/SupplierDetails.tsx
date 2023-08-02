import {
  Cart2,
  CartCheck,
  Search,
} from "react-bootstrap-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HeaderTitle } from "../../../utils/HeaderTitle"
import TextField from "../../../components/TextField/TextField";
import Button from "../../../components/Button/Button";
import { useCallback, useState } from "react";
import { suppliersMedicinesData } from "../../../Schema/response/medicinesInSupplier";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import { findMedicine } from "../../../Schema/response/medicine.schema";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import { PaginationState } from "@tanstack/react-table";
import { routes } from "../../../router/constant";
import Header, { HeaderTypes } from "../../../components/Header/Header";
import Review from "../Review";
const catigoriesList = [
  "جميع الفئات",
  "Bronchodilator",
  "Statins",
  "Antibiotic",
  "Analgesic",
];
const SupplierDetails = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { supplierId } = useParams();
  const [filtered, setFiltered] = useState(catigoriesList[0]);
  const [open, setOpen] = useState<boolean>(false);
  const [{ pageIndex }] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${routes.SUPPLIERS}/${supplierId}/${routes.SEND_ORDER}`);
  };
  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);
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
              <Button
                variant="base-blue"
                disabled={false}
                text="تقييم"
                size="med"
                onClick={handleOpen}
              />
            </>
          }
          leftSpace={HeaderTypes.DISTRIPUTE}
        />
        <div className="mid overflow-auto scrollbar-none p-large">
          {catigoriesList.map((filter) => (
            <Button
              key={filter}
              variant={`${filtered === filter ? "active-text" : "text"}`}
              disabled={false}
              text={filter}
              size="med"
              className="min-w-max"
              onClick={() => setFiltered(filter)}
            />
          ))}
        </div>
        <div
          style={{ width: "100%", height: "calc(100% - 135px)" }}
          className="bg-greyScale-lighter p-large"
        >
          <div className="h-full px-large py-large flex flex-col bg-white rounded-med">
            <div className="flex-1 h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
              {suppliersMedicinesData.map((med) => {
                const medicine = findMedicine(med.medicineId);
                return (
                  <MedicineCard
                    key={med.id}
                    name={medicine.name}
                    category={medicine.category}
                    photoAlt={medicine.name}
                    photoSrc={medicine.photo}
                    subtitle={`${medicine.sellingPrice} ل.س`}
                    action={
                      <Button
                        variant="secondary-light"
                        disabled={false}
                        start={false}
                        icon={<CartCheck fontSize="small" />}
                        text="إضافة إلى السلة"
                        size="med"
                      />
                    }
                  />
                );
              })}
            </div>
            <div className="flex sm:flex-row flex-col justify-between items-center">
              <CustomPagination
                page={pageIndex}
                count={suppliersMedicinesData.length}
              />

              <Button
                variant="base-blue"
                disabled={false}
                icon={<Cart2 fontSize="small" />}
                start={false}
                text="السلة"
                size="lg"
                className="mt-large"
                onClick={handleNavigate}
              />
            </div>
          </div>
        </div>
      </div>
      <Review open={open} handleOpen={handleOpen} />
    </>
  );
};

export default SupplierDetails;
