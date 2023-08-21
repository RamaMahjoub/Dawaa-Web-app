import { FC } from "react";
import Button from "../../components/Button/Button";
import { GeoAltFill, StarFill, TelephoneFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/constant";
import { Supplier } from "../../Schema/Responses/Supplier";

interface Props {
  supplierData: Supplier;
}
const SupplierCard: FC<Props> = ({ supplierData }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${routes.SUPPLIERS}/${supplierData.id}`);
  };
  return (
    <div className="flex flex-col gap-2 bg-white rounded-med p-large text-large text-greyScale-main h-fit">
      <span className="flex justify-between flex-1 gap-1">
        <div className="flex gap-1">
          <p>
            {Number(supplierData.id) < 10
              ? `0${supplierData.id}`
              : supplierData.id}
          </p>
          <p className="px-medium">{supplierData.name}</p>
        </div>
        <div className="flex items-center justify-center gap-1 max-w-fit max-h-fit h-fit px-small bg-greyScale-lighter rounded-small">
          <StarFill className="w-3 h-3 text-secondary-main" />
          <p>{supplierData.rating}</p>
        </div>
      </span>
      <div className="flex flex-col bg-greyScale-lighter p-large rounded-med text-greyScale-light text-medium">
        <span className="flex items-center gap-1">
          <GeoAltFill className="w-3 h-3" /> {supplierData.location}
        </span>
        <span className="flex items-center gap-1">
          <TelephoneFill className="w-3 h-3" /> {supplierData.phoneNumber}
        </span>
      </div>
      <Button
        variant="secondary"
        disabled={false}
        text="عرض الأدوية"
        size="lg"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default SupplierCard;
