import { useLocation, useParams } from "react-router-dom";
import { HeaderTitle } from "../../../utils/HeaderTitle";
import { findOrder } from "../../../Schema/response/outgoingOrders.schema";
import { ChevronLeft } from "react-bootstrap-icons";
import IconBadge from "../../../components/Badge/IconBadge";
import TextBadge, { BadgeStatus } from "../../../components/Badge/TextBadge";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import Header, { HeaderTypes } from "../../../components/Header/Header";
import DestinationCard from "../../../components/DestinationCard/DestinationCard";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import ReturnRequest from "../ReturnRequest/ReturnRequest";

const OutgoingOrderDetails = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [open, setOpen] = useState<boolean>(false);
  const { orderId } = useParams();
  const order = findOrder(orderId!);
  let cost: number = order.medicines.reduce(
    (acc, medicine) =>
      (acc += medicine.medicine.sellingPrice * medicine.quantity),
    0
  );
  const handleOpen = () => {
    setOpen((pre) => !pre);
  };
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header
          title={
            <>
              {title} <ChevronLeft className="w-4 h-4 mx-small" /> تفاصيل الطلب
            </>
          }
          leftSpace={HeaderTypes.FREE}
        />
        <div className="flex items-center justify-between w-full gap-1 p-large text-greyScale-light bg-greyScale-lighter text-x-large">
          رقم الطلب: #{orderId}
          <Button
            text="طلب إرجاع"
            variant="base-blue"
            disabled={false}
            size="lg"
            onClick={handleOpen}
          />
        </div>
        <div className="flex-1 bg-greyScale-lighter sm:flex-row flex-col gap-large flex px-large pb-large overflow-auto scrollbar-thin">
          <div className="w-full flex gap-medium sm:flex-row flex-col ">
            <div className="sm:max-h-fit flex flex-1 flex-col gap-large overflow-auto scrollbar-thin">
              <DestinationCard
                title={order.to.name}
                subTitle={order.to.address}
                email={order.to.email}
                phone={order.to.phone}
                inactive={true}
              />
            </div>
            <div className="bg-white flex-1 flex flex-col sm:h-full  rounded-med p-large">
              <p className="text-x-large text-greyScale-main">العناصر</p>
              <div className="flex-1 h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
                {order.medicines.map((medicine) => (
                  <MedicineCard
                    key={medicine.medicine.name}
                    name={medicine.medicine.name}
                    photoAlt={medicine.medicine.name}
                    photoSrc={medicine.medicine.photo}
                    subtitle={`${medicine.medicine.purchasingPrice} ل.س`}
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
              <div className="w-full h-10  flex items-center justify-end">
                <TextBadge
                  className="mx-medium"
                  title={`${cost} ل.س`}
                  status={BadgeStatus.BASE}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReturnRequest open={open} handleOpen={handleOpen} orderId={orderId!} />
    </>
  );
};

export default OutgoingOrderDetails;
