import { FC } from "react";
import { OStoreSchema, StoreSchema } from "../../Schema/response/Store.schema";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/constant";

interface Props {
  storeData: OStoreSchema;
}
const StoreCard: FC<Props> = ({ storeData }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${routes.ALL_STORES}/${storeData.id}`);
  };
  return (
    <div className="w-full p-large bg-white rounded-small">
      <div className="pb-small flex items-center justify-between">
        <span className="flex text-x-large text-greyScale-main">
          <p>{storeData.id}</p>
          <p className="px-medium">{storeData.name}</p>
        </span>
        <Button
          variant="secondary-light"
          disabled={false}
          text="عرض الأدوية"
          size="med"
          onClick={handleNavigate}
        />
      </div>
      <div className="bg-greyScale-lighter h-fit rounded-small p-large sm:flex justify-between leading-loose">
        <span className="flex flex-col items-center grow">
          <p className="text-small text-greyScale-light">مدير المخزن</p>
          <p className="text-medium text-greyScale-main">{storeData.owner}</p>
        </span>
        <span className="flex flex-col items-center grow border-y sm:border-x sm:border-y-0 border-greyScale-light">
          <p className="text-small text-greyScale-light">العنوان التفصيلي</p>
          <p className="text-medium text-greyScale-main">{storeData.location}</p>
        </span>
        <span className="flex flex-col items-center grow">
          <p className="text-small text-greyScale-light"> رقم الهاتف</p>
          <p className="text-medium text-greyScale-main">{storeData.phoneNumber}</p>
        </span>
      </div>
    </div>
  );
};

export default StoreCard;
