import { Search } from "react-bootstrap-icons";
import TextField from "../../components/TextField/TextField";
import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Header, { HeaderTypes } from "../../components/Header/Header";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getAllSuppliers,
  selectAllSuppliersData,
  selectAllSuppliersStatus,
} from "../../redux/supplierSlice";
import SupplierCard from "./SupplierCard";
import Beat from "../../components/Loading/Beat";
import NoData from "../NoData/NoData";
import { ResponseStatus } from "../../enums/ResponseStatus";

const Suppliers = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllSuppliersData);
  const status = useAppSelector(selectAllSuppliersStatus);
  let content;
  useEffect(() => {
    dispatch(getAllSuppliers());
  }, [dispatch]);
  if (status === ResponseStatus.LOADING) {
    content = <Beat />;
  } else if (status === ResponseStatus.SUCCEEDED) {
    content =
      data.data.length > 0 ? (
        data.data.map((row: any) => (
          <SupplierCard supplierData={row} key={row.id} />
        ))
      ) : (
        <NoData />
      );
  }
  return (
    <div className="flex flex-col h-screen">
      <Header
        title={title!}
        action={
          <TextField
            startIcon={<Search />}
            placeholder="بحث"
            inputSize="large"
          />
        }
        leftSpace={HeaderTypes.ALL}
      />
      <div className="grid flex-1 grid-cols-1 overflow-auto bg-greyScale-lighter scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter p-large gap-large sm:grid-cols-2 lg:grid-cols-3">
        {content}
      </div>
    </div>
  );
};

export default Suppliers;
