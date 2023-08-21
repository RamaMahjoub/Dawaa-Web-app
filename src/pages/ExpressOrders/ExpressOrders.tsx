import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import { useCallback, useState } from "react";
import { data, findOrder } from "../../Schema/response/expressOrder";
import IconBadge from "../../components/Badge/IconBadge";
import { BadgeStatus } from "../../components/Badge/TextBadge";
import { toShowTime } from "../../utils/showTIme";
import Button from "../../components/Button/Button";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Header, { HeaderTypes } from "../../components/Header/Header";
import DestinationCard from "../../components/DestinationCard/DestinationCard";

const ExpressOrders = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [selectedOrder, setSelectedOrder] = useState<{
    index: number;
    orderId: string;
  }>({ index: 0, orderId: data[0].id });
  const handleSelectOrder = useCallback((index: number, orderId: string) => {
    setSelectedOrder({ index, orderId });
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div
        className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large p-large scrollbar-thin"
      >
        <div className="flex overflow-auto bg-white basis-auto shrink-0 sm:h-full sm:max-h-fit sm:flex-col gap-large p-medium scrollbar-thin sm:w-1/2 rounded-med">
          {data.map((order, index) => {
            const date = new Date().getTime() - order.requestDate.getTime();

            return (
              <div key={index} className="border-l pl-large sm:border-l-0 sm:pl-0 sm:border-b sm:pb-large">
                <DestinationCard
                  title={order.from.name}
                  subTitle={order.from.address}
                  date={toShowTime(date)}
                  email={order.from.email}
                  phone={order.from.phone}
                  inactive={selectedOrder?.index !== index}
                  handleActive={() => handleSelectOrder(index, order.id)}
                  action={
                    <Button
                      text="قبول الطلب"
                      variant="base-blue"
                      disabled={false}
                      size="med"
                    />
                  }
                />
              </div>
            );
          })}
        </div>
        {selectedOrder !== undefined && (
          <div className="flex flex-col flex-1 bg-white sm:h-full sm:w-1/2 rounded-med p-large">
          <p className="text-x-large text-greyScale-main">العناصر</p>
            <div className="flex-1 overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
              {findOrder(selectedOrder.orderId).medicines.map((medicine) => (
                <MedicineCard
                  key={medicine.medicine.name}
                  name={medicine.medicine.name}
                  photoAlt={medicine.medicine.name}
                  photoSrc={medicine.medicine.photo}
                  action={
                    <IconBadge
                      icon={
                        <p className="font-bold text-xx-large">
                          x{medicine.quantity}
                        </p>
                      }
                      status={BadgeStatus.WARNING}
                    />
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpressOrders;
