import { XSquareFill } from "react-bootstrap-icons";
import Button from "../../../components/Button/Button";
import { FC, useEffect } from "react";
import { storesData } from "../../../Schema/response/Store.schema";
import { medicines } from "../../../Schema/response/medicine.schema";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import IconBadge from "../../../components/Badge/IconBadge";
import { BadgeStatus } from "../../../components/Badge/TextBadge";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  findOrderDistribution,
  selectOrderOverviewData,
  selectOrderOverviewStatus,
} from "../../../redux/orderSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";

interface Props {
  open: boolean;
  handleOpen: () => void;
  orderId: string;
}
const OrderOverView: FC<Props> = ({ open, handleOpen, orderId }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectOrderOverviewData);
  const status = useAppSelector(selectOrderOverviewStatus);

  useEffect(() => {
    dispatch(findOrderDistribution({ id: orderId }));
  }, [dispatch, orderId]);

  
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] h-[435px] flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              تجميع الطلب من المخازن
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col items-center flex-1 overflow-auto gap-small px-medium py-medium scrollbar-thin">
              <div className="flex flex-col flex-1 w-full shadow-sm rounded-med p-medium">
                <p className="text-large text-greyScale-dark">
                  {storesData[0].name}
                </p>
                <MedicineCard
                  key={1}
                  name={medicines[0].name}
                  photoAlt={medicines[0].name}
                  photoSrc={medicines[0].photo}
                  action={
                    <IconBadge
                      icon={<p className="font-bold text-xx-large">x5</p>}
                      status={BadgeStatus.WARNING}
                    />
                  }
                />
              </div>
              <div className="flex flex-col flex-1 w-full shadow-sm rounded-med p-medium">
                <p className="text-large text-greyScale-dark">
                  {storesData[1].name}
                </p>
                <MedicineCard
                  key={1}
                  name={medicines[0].name}
                  photoAlt={medicines[0].name}
                  photoSrc={medicines[0].photo}
                  action={
                    <IconBadge
                      icon={<p className="font-bold text-xx-large">x5</p>}
                      status={BadgeStatus.WARNING}
                    />
                  }
                />
                <MedicineCard
                  key={1}
                  name={medicines[1].name}
                  photoAlt={medicines[1].name}
                  photoSrc={medicines[1].photo}
                  action={
                    <IconBadge
                      icon={<p className="font-bold text-xx-large">x5</p>}
                      status={BadgeStatus.WARNING}
                    />
                  }
                />
                <MedicineCard
                  key={1}
                  name={medicines[0].name}
                  photoAlt={medicines[0].name}
                  photoSrc={medicines[0].photo}
                  action={
                    <IconBadge
                      icon={<p className="font-bold text-xx-large">x5</p>}
                      status={BadgeStatus.WARNING}
                    />
                  }
                />
              </div>
            </div>
            <div className="flex justify-center p-medium">
              <Button
                text="حسناً"
                variant="base-blue"
                disabled={false}
                size="lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderOverView;
