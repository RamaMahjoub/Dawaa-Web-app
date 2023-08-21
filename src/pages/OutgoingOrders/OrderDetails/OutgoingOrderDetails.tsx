import { useLocation, useParams } from "react-router-dom";
import { HeaderTitle } from "../../../utils/HeaderTitle";
import { ChevronLeft } from "react-bootstrap-icons";
import IconBadge from "../../../components/Badge/IconBadge";
import TextBadge, { BadgeStatus } from "../../../components/Badge/TextBadge";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import Header, { HeaderTypes } from "../../../components/Header/Header";
import DestinationCard from "../../../components/DestinationCard/DestinationCard";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  findSendedOrderDetails,
  selectSendedOrderDetailsData,
  selectSendedOrderDetailsStatus,
} from "../../../redux/orderSlice";
import Beat from "../../../components/Loading/Beat";
import { ResponseStatus } from "../../../enums/ResponseStatus";
import {
  MedicineInSendedOrder,
  SupplierInSendedOrder,
} from "../../../Schema/Responses/SendedOrder";
const NotFound = require("./../../../assets/medicines/not-found.png");

const OutgoingOrderDetails = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { orderId } = useParams();
  const contentRef = useRef<any>();
  const [cost, setCost] = useState<number | null>(null);
  const [supplier, setSupplier] = useState<SupplierInSendedOrder | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectSendedOrderDetailsData);
  const status = useAppSelector(selectSendedOrderDetailsStatus);
  useEffect(() => {
    dispatch(findSendedOrderDetails({ id: orderId! }));
  }, [orderId, dispatch]);
  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) {
      const total = data.data?.medicines.reduce(
        (acc: number, medicine: MedicineInSendedOrder) =>
          (acc += medicine.price * medicine.quantity),
        0
      );
      setCost(total!);
      setSupplier(data.data?.supplier);
      contentRef.current = data.data?.medicines.map(
        (medicine: MedicineInSendedOrder) => (
          <MedicineCard
            key={medicine.name}
            name={medicine.name}
            photoAlt={medicine.name}
            photoSrc={medicine.imageUrl === null ? NotFound : medicine.imageUrl}
            subtitle={`${medicine.price} ل.س`}
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
        )
      );
    }
  }, [status, data]);
  if (status === ResponseStatus.LOADING) {
    contentRef.current = <Beat />;
  } else if (status === ResponseStatus.FAILED) {
    contentRef.current = <div>حدث خطأ ما...</div>;
  }
  console.log(data);
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
          رقم الطلب: #{orderId}
        </div>
        <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large px-large pb-large scrollbar-thin">
          <div className="flex flex-col w-full gap-medium sm:flex-row ">
            <div className="flex flex-col flex-1 overflow-auto sm:max-h-fit gap-large scrollbar-thin">
              {supplier ? (
                <DestinationCard
                  title={supplier.name}
                  subTitle={supplier.location}
                  email={supplier.email}
                  phone={supplier.phoneNumber}
                  inactive={true}
                />
              ) : (
                <Beat />
              )}
            </div>
            <div className="flex flex-col flex-1 bg-white sm:h-full rounded-med p-large">
              <p className="text-x-large text-greyScale-main">العناصر</p>
              <div className="flex-1 h-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
                {contentRef.current}
              </div>
              <div className="flex items-center justify-end w-full h-10">
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
    </>
  );
};

export default OutgoingOrderDetails;
