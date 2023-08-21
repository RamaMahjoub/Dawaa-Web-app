import { XSquareFill } from "react-bootstrap-icons";
import Button from "../../../components/Button/Button";
import { FC, useEffect } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { ResponseStatus } from "../../../enums/ResponseStatus";
import Beat from "../../../components/Loading/Beat";
import { MedicineInOverview, OrderOverview } from "../../../Schema/Responses/ReceivedOrder";
const NotFound = require("./../../../assets/medicines/not-found.png");

interface Props {
  open: boolean;
  handleOpen: () => void;
  orderId: string;
}
const OrderOverView: FC<Props> = ({ open, handleOpen, orderId }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectOrderOverviewData);
  const status = useAppSelector(selectOrderOverviewStatus);
  let content;
  useEffect(() => {
    dispatch(findOrderDistribution({ id: orderId }));
  }, [dispatch, orderId]);

  if (status === ResponseStatus.FAILED) {
    content = <div>حدث خطأ ما...</div>;
  } else if (status === ResponseStatus.LOADING) {
    content = <Beat />;
  }
  console.log(data);
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
              {data.data
                ? data.data.map((item: OrderOverview) => {
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col flex-1 w-full shadow-sm rounded-med p-medium"
                      >
                        <p className="text-large text-greyScale-dark">
                          {item.name}
                        </p>
                        {item.medicines.map((med: MedicineInOverview) => {
                          return (
                            <MedicineCard
                              key={uuidv4()}
                              name={med.name}
                              photoAlt={med.name}
                              photoSrc={
                                med.imageUrl === null ? NotFound : med.imageUrl
                              }
                              action={
                                <IconBadge
                                  icon={
                                    <p className="font-bold text-xx-large">
                                      x{med.quantity}
                                    </p>
                                  }
                                  status={BadgeStatus.WARNING}
                                />
                              }
                            />
                          );
                        })}
                      </div>
                    );
                  })
                : content}
            </div>
            <div className="flex justify-center p-medium">
              <Button
                text="حسناً"
                variant="base-blue"
                disabled={false}
                size="lg"
                onClick={handleOpen}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderOverView;
