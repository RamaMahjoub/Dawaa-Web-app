/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import TextField from "../../components/TextField/TextField";
import { PlusLg, Search } from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import { useMediaQuery } from "react-responsive";
import IconButton from "../../components/Button/IconButton";
import { useState } from "react";
import { medicines } from "../../Schema/response/medicine.schema";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { PaginationState } from "@tanstack/react-table";
import { routes } from "../../router/constant";

const catigoriesList = [
  "جميع الفئات",
  "Bronchodilator",
  "Statins",
  "Antibiotic",
  "Analgesic",
];
const AllMedicines = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [filtered, setFiltered] = useState(catigoriesList[0]);
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate(`/${routes.STORE_MEDICINES}`);
  };
  const [{ pageIndex }] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const handleNavigate = (medicineId: string) => {
    navigate(`/${routes.ALL_MEDICINES}/${medicineId}`);
  };
  return (
    <div className="h-screen flex flex-col">
      <div className="header">
        <div className="mx-large md:mx-0">{title}</div>
        <div className="flex w-8/12 lg:w-1/2 items-center justify-evenly sm:justify-between">
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
              text="تخزين"
              size="med"
              onClick={handleOpen}
            />
          )}
        </div>
      </div>
      <div className="mid overflow-auto scrollbar-none p-large">
        {catigoriesList.map((category) => (
          <Button
            key={category}
            variant={`${filtered === category ? "active-text" : "text"}`}
            disabled={false}
            text={category}
            size="med"
            className="min-w-max"
            onClick={() => setFiltered(category)}
          />
        ))}
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
                    text="عرض التفاصيل"
                    size="med"
                    onClick={() => handleNavigate(medicine.medicineId)}
                  />
                }
              />
            ))}
          </div>
          <CustomPagination page={pageIndex} count={medicines.length} />
        </div>
      </div>
    </div>
  );
};

export default AllMedicines;
