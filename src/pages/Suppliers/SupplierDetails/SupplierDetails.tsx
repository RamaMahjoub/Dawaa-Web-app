import { Cart2, CartCheck, Search } from "react-bootstrap-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HeaderTitle } from "../../../utils/HeaderTitle";
import TextField from "../../../components/TextField/TextField";
import Button from "../../../components/Button/Button";
import { useDeferredValue, useEffect, useState } from "react";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import { routes } from "../../../router/constant";
import Header, { HeaderTypes } from "../../../components/Header/Header";
import Review from "../Review";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  findBasketMedicine,
  getSupplierMedicines,
  selectSupplierMedicinesData,
  selectSupplierMedicinesStatus,
} from "../../../redux/supplierSlice";
import { useOpenToggle } from "../../../hooks/useOpenToggle";
import { usePagination } from "../../../hooks/usePagination";
import NoData from "../../NoData/NoData";
import Beat from "../../../components/Loading/Beat";
import { ResponseStatus } from "../../../enums/ResponseStatus";
import { MedicineFromSupplier } from "../../../Schema/Responses/MedicineFromSupplier";
const NotFound = require("./../../../assets/medicines/not-found.png");

const SupplierDetails = () => {
  let catigoriesList = ["جميع الفئات"];
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { supplierId } = useParams();
  const [filtered, setFiltered] = useState(catigoriesList[0]);
  const { open, handleOpen } = useOpenToggle();
  const { pageIndex, pageSize, handlePgination } = usePagination(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(searchQuery);
  const [disaple, setDisaple] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectSupplierMedicinesData);
  const status = useAppSelector(selectSupplierMedicinesStatus);
  console.log(data);
  let content;
  useEffect(() => {
    dispatch(
      getSupplierMedicines({
        id: supplierId!,
        limit: String(pageSize),
        page: String(pageIndex),
        category: filtered !== "جميع الفئات" ? filtered : undefined,
        name: deferredQuery !== "" ? deferredQuery : undefined,
      })
    );
  }, [dispatch, pageIndex, supplierId, pageSize, filtered, deferredQuery]);
  if (status === ResponseStatus.LOADING) {
    content = <Beat />;
  } else if (status === ResponseStatus.SUCCEEDED) {
    data.data.length > 0 &&
      data.data.forEach((row: MedicineFromSupplier) => {
        if (!catigoriesList.includes(row.category))
          catigoriesList.push(row.category);
      });
    content =
      data.data.length > 0 ? (
        data.data.map((row: MedicineFromSupplier) => (
          <MedicineCard
            key={row.id}
            name={row.name}
            category={row.category}
            photoAlt={row.name}
            photoSrc={row.imageUrl !== null ? row.imageUrl : NotFound}
            subtitle={`${row.price} ل.س`}
            action={
              <Button
                variant="secondary-light"
                disabled={false}
                start={false}
                icon={<CartCheck fontSize="small" />}
                text="إضافة إلى السلة"
                size="med"
                onClick={() => handleAddToBasket(row.id)}
              />
            }
          />
        ))
      ) : (
        <NoData />
      );
  } else if (status === ResponseStatus.FAILED) {
    content = <div>حدث خطأ ما...</div>;
  }
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${routes.SUPPLIERS}/${supplierId}/${routes.SEND_ORDER}`);
  };

  const handleAddToBasket = async (medicineId: number) => {
    setDisaple(true);
    await dispatch(findBasketMedicine({ medicineId, quantity: 1 }));
    setDisaple(false);
  };
  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };
  const handleFilter = (filter: string) => {
    setFiltered(filter);
  };
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
                value={searchQuery}
                onChange={handleSearch}
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
        <div className="overflow-auto mid scrollbar-none p-large">
          {catigoriesList.map((filter) => (
            <Button
              key={filter}
              variant={`${filtered === filter ? "active-text" : "text"}`}
              disabled={false}
              text={filter}
              size="med"
              className="min-w-max"
              onClick={() => handleFilter(filter)}
            />
          ))}
        </div>
        <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large p-large scrollbar-thin">
          <div className="flex flex-col w-full h-full bg-white p-large max-h-fit rounded-small">
            <div className="flex-1 h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
              {content}
            </div>
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <CustomPagination
                page={pageIndex + 1}
                count={
                  status === ResponseStatus.SUCCEEDED ? data.totalRecords! : 0
                }
                onChange={handlePgination}
                pageSize={pageSize}
              />

              <Button
                variant="base-blue"
                disabled={disaple}
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
      <Review open={open} handleOpen={handleOpen} supplierId={supplierId!} />
    </>
  );
};

export default SupplierDetails;
