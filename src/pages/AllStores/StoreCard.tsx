import { FC } from "react";
import { OStoreSchema } from "../../Schema/response/Store.schema";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/constant";

interface Props {
  storeData: OStoreSchema;
  index: number;
}

const StoreCard: FC<Props> = ({ storeData, index }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${routes.ALL_STORES}/${storeData.id}`);
  };
  return (
    <div className="w-full bg-white p-large rounded-small">
      <div className="flex items-center justify-between pb-small">
        <span className="flex text-x-large text-greyScale-main">
          <p>{index < 10 ? `0${index}` : index}</p>
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
      <div className="justify-between leading-loose bg-greyScale-lighter h-fit rounded-small p-large sm:flex">
        <span className="flex flex-col items-center grow">
          <p className="text-small text-greyScale-light">مدير المخزن</p>
          <p className="text-medium text-greyScale-main">
            {storeData.managerName}
          </p>
        </span>
        <span className="flex flex-col items-center grow border-y sm:border-x sm:border-y-0 border-greyScale-light">
          <p className="text-small text-greyScale-light">العنوان التفصيلي</p>
          <p className="text-medium text-greyScale-main">
            {storeData.location}
          </p>
        </span>
        <span className="flex flex-col items-center grow">
          <p className="text-small text-greyScale-light"> رقم الهاتف</p>
          <p className="text-medium text-greyScale-main">
            {storeData.phoneNumber}
          </p>
        </span>
      </div>
    </div>
  );
};

export default StoreCard;
