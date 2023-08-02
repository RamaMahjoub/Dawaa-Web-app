import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import { medicines } from "../../Schema/response/medicine.schema";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Button from "../../components/Button/Button";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { PaginationState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import StoreDialog from "./StoreDialog";

const StoreMedicines = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [{ pageIndex }] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="header">
          <div className="mx-large md:mx-0">{title}</div>
        </div>
        <div className="flex-1 bg-greyScale-lighter sm:flex-row flex-col gap-large flex p-large overflow-auto scrollbar-thin">
          <div className="p-large h-full w-full flex flex-col max-h-fit bg-white rounded-small">
            <div className="flex-1 h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
              {medicines.map((medicine) => (
                <MedicineCard
                  key={medicine.medicineId}
                  name={medicine.name}
                  category={medicine.category}
                  photoAlt={medicine.name}
                  photoSrc={medicine.photo}
                  subtitle={medicine.supplier}
                  action={
                    <Button
                      variant="secondary-light"
                      disabled={false}
                      text="تخزين"
                      size="med"
                      onClick={handleOpen}
                    />
                  }
                />
              ))}
            </div>
            <CustomPagination page={pageIndex} count={medicines.length} />
          </div>
        </div>
      </div>
      <StoreDialog open={open} handleOpen={handleOpen} />
    </>
  );
};

export default StoreMedicines;
