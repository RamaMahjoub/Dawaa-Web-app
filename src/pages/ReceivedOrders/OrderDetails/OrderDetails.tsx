import { useLocation, useParams } from "react-router-dom";
import { HeaderTitle } from "../../../utils/HeaderTitle";
import { ChevronLeft, ReceiptCutoff } from "react-bootstrap-icons";
import IconBadge from "../../../components/Badge/IconBadge";
import TextBadge, { BadgeStatus } from "../../../components/Badge/TextBadge";
import Button from "../../../components/Button/Button";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import Header, { HeaderTypes } from "../../../components/Header/Header";
import DestinationCard from "../../../components/DestinationCard/DestinationCard";

import "react-datepicker/dist/react-datepicker.css";
import IconButton from "../../../components/Button/IconButton";
import OrderOverView from "./OrderOverView";
import { useOpenToggle } from "../../../hooks/useOpenToggle";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  findReceivedOrderDetails,
  selectReceivedOrderDetailsData,
  selectReceivedOrderDetailsStatus,
} from "../../../redux/orderSlice";
import Beat from "../../../components/Loading/Beat";
import NoData from "../../NoData/NoData";
import { ResponseStatus } from "../../../enums/ResponseStatus";
const NotFound = require("./../../../assets/medicines/not-found.png");
const OrderDetails = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { orderId } = useParams();
  const contentRef = useRef<any>();
  const [cost, setCost] = useState<number | null>(null);
  const [pharmacy, setPharmacy] = useState<any>(null);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectReceivedOrderDetailsData);
  const status = useAppSelector(selectReceivedOrderDetailsStatus);
  useEffect(() => {
    dispatch(findReceivedOrderDetails({ id: orderId! }));
  }, [orderId, dispatch]);
  const { open, handleOpen } = useOpenToggle();
  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) {
      const total = data.data.medicines.reduce(
        (acc: number, medicine: any) =>
          (acc += medicine.price * medicine.quantity),
        0
      );
      setCost(total);
      setPharmacy(data.data.pharmacy);
      contentRef.current = data.data.medicines.map((medicine: any) => (
        <MedicineCard
          key={medicine.name}
          name={medicine.name}
          photoAlt={medicine.name}
          photoSrc={NotFound}
          subtitle={`${medicine.price} ل.س`}
          action={
            <IconBadge
              icon={
                <p className="font-bold text-xx-large">x{medicine.quantity}</p>
              }
              status={BadgeStatus.WARNING}
            />
          }
        />
      ));
    }
  }, [status, data]);
  if (status === ResponseStatus.LOADING) {
    contentRef.current = <Beat />;
  } else if (status === ResponseStatus.IDLE) {
    contentRef.current = <NoData />;
  } else if (status === ResponseStatus.FAILED) {
    contentRef.current = <div>error...</div>;
  }

  return (
    <>
      <div className="flex flex-col h-screen">
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
        <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large px-large pb-large scrollbar-thin">
          <div className="flex flex-col w-full gap-3 sm:flex-row ">
            <div className="flex flex-col flex-1 overflow-auto sm:max-h-fit sm:w-4/12 gap-large scrollbar-thin">
              {pharmacy ? (
                <DestinationCard
                  title={pharmacy.name}
                  subTitle={pharmacy.location}
                  email={pharmacy.email}
                  phone={pharmacy.phoneNumber}
                  inactive={true}
                />
              ) : (
                <Beat />
              )}
            </div>
            <div className="flex flex-col flex-1 overflow-auto bg-white sm:h-full rounded-med p-large">
              <p className="text-x-large text-greyScale-main">العناصر</p>
              <div className="flex-1 h-full overflow-auto scrollbar-thin ">
                {contentRef.current}
              </div>
              <div className="flex items-center justify-end w-full">
                {cost ? (
                  <TextBadge
                    className="mx-medium"
                    title={`${cost} ل.س`}
                    status={BadgeStatus.BASE}
                  />
                ) : (
                  <Beat />
                )}
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
