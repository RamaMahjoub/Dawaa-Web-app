/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import TextField from "../../components/TextField/TextField";
import { PlusLg, Search } from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import { useMediaQuery } from "react-responsive";
import IconButton from "../../components/Button/IconButton";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { routes } from "../../router/constant";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  findAllMedicines,
  selectAllMedicinesData,
  selectAllMedicinesStatus,
} from "../../redux/medicineSlice";
import Beat from "../../components/Loading/Beat";
import NoData from "../NoData/NoData";
import { usePagination } from "../../hooks/usePagination";
import { ResponseStatus } from "../../enums/ResponseStatus";
const NotFound = require("./../../assets/medicines/not-found.png");

const AllMedicines = () => {
  let catigoriesList = ["جميع الفئات"];
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [filtered, setFiltered] = useState(catigoriesList[0]);
  const { pageIndex, pageSize, handlePgination } = usePagination(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(searchQuery);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllMedicinesData);
  const status = useAppSelector(selectAllMedicinesStatus);
  let content = useRef<any>();
  useEffect(() => {
    dispatch(
      findAllMedicines({
        limit: String(pageSize),
        page: String(pageIndex),
        category: filtered !== "جميع الفئات" ? filtered : undefined,
        name: deferredQuery !== "" ? deferredQuery : undefined,
      })
    );
  }, [dispatch, pageIndex, pageSize, filtered, deferredQuery]);

  if (status === ResponseStatus.LOADING) {
    content.current = <Beat />;
  } else if (status === ResponseStatus.SUCCEEDED) {
    data.data.length > 0 &&
      data.data.forEach((row: any) => {
        if (!catigoriesList.includes(row.category))
          catigoriesList.push(row.category);
      });
    content.current =
      data.data.length > 0 ? (
        data.data.map((row: any) => (
          <MedicineCard
            key={row.id}
            name={row.name}
            category={row.category}
            photoAlt={row.name}
            photoSrc={NotFound}
            subtitle={`${row.price} ل.س`}
            action={
              <Button
                variant="secondary-light"
                disabled={false}
                text="عرض التفاصيل"
                size="med"
                onClick={() => handleNavigate(row.id)}
              />
            }
          />
        ))
      ) : (
        <NoData />
      );
  } else if (status === ResponseStatus.IDLE) {
    content.current = <NoData />;
  }
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate(`/${routes.STORE_MEDICINES}`);
  };
  const handleNavigate = (medicineId: string) => {
    navigate(`/${routes.ALL_MEDICINES}/${medicineId}`);
  };
  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };
  const handleFilter = (filter: string) => {
    setFiltered(filter);
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="header">
        <div className="mx-large md:mx-0">{title}</div>
        <div className="flex items-center w-8/12 lg:w-1/2 justify-evenly sm:justify-between">
          <TextField
            startIcon={<Search />}
            placeholder="بحث"
            inputSize="medium"
            value={searchQuery}
            onChange={handleSearch}
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
      <div className="overflow-auto mid scrollbar-none p-large">
        {catigoriesList.map((category) => (
          <Button
            key={category}
            variant={`${filtered === category ? "active-text" : "text"}`}
            disabled={false}
            text={category}
            size="med"
            className="min-w-max"
            onClick={() => handleFilter(category)}
          />
        ))}
      </div>
      <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large p-large scrollbar-thin">
        <div className="flex flex-col w-full h-full bg-white p-large max-h-fit rounded-small">
          <div className="flex-1 h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
            {content.current}
          </div>
          <CustomPagination
            page={pageIndex + 1}
            count={status === "succeeded" ? data.totalRecords : 0}
            onChange={handlePgination}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default AllMedicines;
