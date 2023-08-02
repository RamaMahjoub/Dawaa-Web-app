import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import { useCallback, useState } from "react";
import { data, findOrder } from "../../Schema/response/expressOrder.schema";
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
    <div className="h-screen flex flex-col">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div
        className="flex-1 bg-greyScale-lighter sm:flex-row flex-col gap-large flex p-large overflow-auto scrollbar-thin"
      >
        <div className="bg-white basis-auto shrink-0 sm:h-full sm:max-h-fit flex sm:flex-col gap-large p-medium overflow-auto scrollbar-thin sm:w-1/2 rounded-med">
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
          <div className="bg-white flex-1 flex flex-col sm:h-full sm:w-1/2 rounded-med p-large">
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
