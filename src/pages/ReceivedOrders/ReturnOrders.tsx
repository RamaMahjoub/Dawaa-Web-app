import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { routes } from "../../router/constant";
import Header, { HeaderTypes } from "../../components/Header/Header";
import { data, findOrder } from "../../Schema/response/returnOrders.schema";
import DestinationCard from "../../components/DestinationCard/DestinationCard";
import { toShowTime } from "../../utils/showTIme";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import IconBadge from "../../components/Badge/IconBadge";
import { BadgeStatus } from "../../components/Badge/TextBadge";
interface Filter {
  name: string;
  route: string;
}
const filterList: Array<Filter> = [
  { name: "طلبات الشراء", route: `/${routes.PURCHASE_ORDERS}` },
  { name: "طلبات الإرجاع", route: `/${routes.RETURN_ORDERS}` },
];

const ReturnOrders = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [filtered, setFiltered] = useState<string>(filterList[1].name);
  const [selectedOrder, setselectedOrder] = useState<{
    index: number;
    orderId: string;
  }>({ index: 0, orderId: data[0].id });
  const navigate = useNavigate();
  const handleFilter = (filter: Filter) => {
    setFiltered(filter.name);
    navigate(filter.route);
  };

  const handleActive = (index: number, orderId: string) => {
    setselectedOrder({ index, orderId });
  };
  return (
    <div className="h-screen flex flex-col">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="mid overflow-auto scrollbar-none p-large">
        {filterList.map((filter) => (
          <Button
            key={filter.name}
            variant={`${filtered === filter.name ? "active-text" : "text"}`}
            disabled={false}
            text={filter.name}
            size="med"
            className="min-w-max"
            onClick={() => handleFilter(filter)}
          />
        ))}
      </div>
      <div className="flex-1 bg-greyScale-lighter sm:flex-row flex-col gap-large flex p-large overflow-auto scrollbar-thin">
        <div className="bg-white basis-auto shrink-0 sm:h-full sm:max-h-fit flex sm:flex-col gap-large p-medium overflow-auto scrollbar-thin sm:w-1/2 rounded-med">
          {data.map((order, index) => {
            const date = new Date().getTime() - order.requestDate.getTime();

            return (
              <div
                key={index}
                className="border-l pl-large sm:border-l-0 sm:pl-0 sm:border-b sm:pb-large"
              >
                <DestinationCard
                  title={order.from.name}
                  subTitle={order.from.address}
                  date={toShowTime(date)}
                  email={order.from.email}
                  phone={order.from.phone}
                  inactive={selectedOrder.index !== index}
                  handleActive={() => handleActive(index, order.id)}
                  action={
                    <>
                      <Button
                        text="قبول الطلب"
                        variant="base-blue"
                        disabled={false}
                        size="med"
                        className="min-w-max"
                        style={{ flex: "1" }}
                      />
                      <Button
                        text="رفض الطلب"
                        variant="red"
                        disabled={false}
                        size="med"
                        className="min-w-max"
                        style={{ flex: "1" }}
                      />
                    </>
                  }
                />
              </div>
            );
          })}
        </div>
        {selectedOrder !== undefined && (
          <div className="bg-white flex-1 flex flex-col sm:h-full sm:w-1/2 rounded-med p-large">
            <p className="text-x-large text-greyScale-main">العناصر</p>
            <div className="h-2/6 overflow-auto scrollbar-thin mb-large">
              {findOrder(selectedOrder.orderId).medicines.map((med, index) => {
                return (
                  <MedicineCard
                    key={index}
                    name={med.medicine.name}
                    subtitle={`الدفعة: ${med.medicine.batchId}`}
                    photoAlt={med.medicine.name}
                    photoSrc={med.medicine.photo}
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
            <div className="flex-1 flex flex-col h-4/6 gap-small border  border-greyScale-light rounded-med p-large ">
              <p className="text-primary-main text-medium">السبب:</p>
              <p className="text-greyScale-dark text-large h-5/6 overflow-auto scrollbar-thin">
                {findOrder(selectedOrder.orderId).reason}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnOrders;
