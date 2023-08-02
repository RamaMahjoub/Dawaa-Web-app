import {
  GeoAltFill,
  Search,
  StarFill,
  TelephoneFill,
} from "react-bootstrap-icons";
import TextField from "../../components/TextField/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import { suppliers } from "../../Schema/response/Suppliers.schema";
import Button from "../../components/Button/Button";
import { routes } from "../../router/constant";
import Header, { HeaderTypes } from "../../components/Header/Header";

const Suppliers = () => {
  
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const navigate = useNavigate();
  const handleNavigate = (supplierId: string) => {
    navigate(`/${routes.SUPPLIERS}/${supplierId}`);
  };
  return (
    <div className="h-screen flex flex-col">
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
      <div className="flex-1 bg-greyScale-lighter overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter p-large gap-large grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white rounded-med p-large flex flex-col gap-2 text-large text-greyScale-main"
          >
            <span className="flex gap-1 justify-between flex-1">
              <div className="flex gap-1">
                <p>{supplier.id}</p>
                <p className="px-medium">{supplier.name}</p>
              </div>
              <div className="flex gap-1 max-w-fit max-h-fit h-fit items-center justify-center px-small bg-greyScale-lighter rounded-small">
                <StarFill className="text-secondary-main w-3 h-3" />
                <p>{supplier.evaluation}</p>
              </div>
            </span>
            <div className="bg-greyScale-lighter p-large rounded-med flex flex-col text-greyScale-light text-medium">
              <span className="flex items-center gap-1">
                <GeoAltFill className="w-3 h-3" /> {supplier.address}
              </span>
              <span className="flex items-center gap-1">
                <TelephoneFill className="w-3 h-3" /> {supplier.phone}
              </span>
            </div>
            <Button
              variant="secondary"
              disabled={false}
              text="عرض الأدوية"
              size="lg"
              onClick={() => handleNavigate(supplier.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;
