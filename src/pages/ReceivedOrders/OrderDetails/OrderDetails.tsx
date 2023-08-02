import { useLocation, useParams } from "react-router-dom";
import { HeaderTitle } from "../../../utils/HeaderTitle";
import { findOrder } from "../../../Schema/response/purchaseOrders.schema";
import { ChevronLeft, ReceiptCutoff } from "react-bootstrap-icons";
import IconBadge from "../../../components/Badge/IconBadge";
import TextBadge, { BadgeStatus } from "../../../components/Badge/TextBadge";
import Button from "../../../components/Button/Button";
import { useCallback, useState } from "react";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import Header, { HeaderTypes } from "../../../components/Header/Header";
import DestinationCard from "../../../components/DestinationCard/DestinationCard";

import "react-datepicker/dist/react-datepicker.css";
import IconButton from "../../../components/Button/IconButton";
import OrderOverView from "./OrderOverView";

const OrderDetails = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { orderId } = useParams();
  const order = findOrder(orderId!);
  const [open, setOpen] = useState<boolean>(false);
  let cost: number = order.medicines.reduce(
    (acc, medicine) =>
      (acc += medicine.medicine.sellingPrice * medicine.quantity),
    0
  );

  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);
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
          <span className="flex items-center gap-medium">
            <IconButton
              color="light-grey"
              icon={<ReceiptCutoff style={{ fontSize: "21px" }} />}
              onClick={handleOpen}
            />
            رقم الطلب: #{orderId}
          </span>
          <div className="flex gap-small">
            <Button
              text="تم التسليم"
              variant="green"
              disabled={false}
              size="med"
              className="min-w-max"
              style={{ flex: "1" }}
            />
            <Button
              text="قبول الطلب"
              variant="secondary-light"
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
          </div>
        </div>
        <div className="flex-1 bg-greyScale-lighter sm:flex-row flex-col gap-large flex px-large pb-large overflow-auto scrollbar-thin">
          <div className="w-full flex gap-3 sm:flex-row flex-col ">
            <div className="sm:max-h-fit sm:w-4/12 flex flex-1 flex-col gap-large overflow-auto scrollbar-thin">
              <DestinationCard
                title={order.from.name}
                subTitle={order.from.address}
                email={order.from.email}
                phone={order.from.phone}
                inactive={true}
              />
            </div>
            <div className="bg-white flex-1 flex flex-col overflow-auto sm:h-full rounded-med p-large">
              <p className="text-x-large text-greyScale-main">العناصر</p>
              <div className="flex-1 h-full overflow-auto scrollbar-thin ">
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
              <div className="w-full flex items-center justify-end">
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
      <OrderOverView open={open} handleOpen={handleOpen} />
    </>
  );
};

export default OrderDetails;
