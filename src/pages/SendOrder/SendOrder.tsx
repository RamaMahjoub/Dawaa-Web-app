import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Counter from "../../components/Counter/Counter";
import TextBadge, { BadgeStatus } from "../../components/Badge/TextBadge";
import Header, { HeaderTypes } from "../../components/Header/Header";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  Basket,
  clearBasket,
  getSupplierDetails,
  selectBasket,
  selectSupplierDetailsData,
  selectSupplierDetailsStatus,
} from "../../redux/supplierSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createOrder, selectCreateOrderStatus } from "../../redux/orderSlice";
import { routes } from "../../router/constant";
import { ResponseStatus } from "../../enums/ResponseStatus";
import Clip from "../../components/Loading/Clip";
import Beat from "../../components/Loading/Beat";

const NotFound = require("./../../assets/medicines/not-found.png");

const SendOrder = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState<any>();
  let supplierContent;
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  console.log(basket);
  const [total, setTotal] = useState<number>(0);
  const [medicineQuantities, setMedicineQuantities] = useState<{
    [key: number]: number;
  }>(
    basket.reduce(
      (acc: any, item: Basket) => ({
        ...acc,
        [item.medicine.data.id]: item.quantity,
      }),
      {}
    )
  );
  const handleQuantityChange = (
    medicineId: number,
    medicinePrice: number,
    quantity: number
  ) => {
    setMedicineQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicineId]: quantity,
    }));
    setTotal(
      (prevTotal) =>
        prevTotal -
        medicineQuantities[medicineId] * medicinePrice +
        medicinePrice * quantity
    );
  };
  const handleFindMedicineFulfilled = (medicinePrice: number) => {
    setTotal((prevTotal) => prevTotal + medicinePrice);
  };

  const supplierStatus = useAppSelector(selectSupplierDetailsStatus);
  const supplierData = useAppSelector(selectSupplierDetailsData);
  const createOrderStatus = useAppSelector(selectCreateOrderStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (createOrderStatus === ResponseStatus.SUCCEEDED) {
      navigate(`/${routes.SUPPLIERS}/${supplierId}`);
    }
  }, [createOrderStatus, navigate, supplierId]);
  let medicines = basket.map((item: Basket) => {
    return (
      <MedicineCard
        key={item.medicine.data.id}
        name={item.medicine.data.name}
        subtitle={`${item.medicine.data.price} ل.س`}
        photoAlt={item.medicine.data.name}
        photoSrc={NotFound}
        action={
          <Counter
            quantity={medicineQuantities[item.medicine.data.id]}
            onChange={(quantity) =>
              handleQuantityChange(
                item.medicine.data.id,
                item.medicine.data.price,
                quantity
              )
            }
          />
        }
      />
    );
  });
  useEffect(() => {
    dispatch(
      getSupplierDetails({
        id: supplierId!,
      })
    );

    basket.forEach((item: Basket) => {
      handleFindMedicineFulfilled(item.medicine.data.price);
    });
  }, [dispatch, supplierId, basket]);

  useEffect(() => {
    supplierStatus === ResponseStatus.SUCCEEDED &&
      setSupplier(supplierData.data);
  }, [supplierStatus, supplierData.data]);
  if (supplierStatus === ResponseStatus.LOADING) {
    supplierContent = <Beat />;
  } else if (supplierStatus === ResponseStatus.FAILED) {
    supplierContent = <div>error...</div>;
  }

  const handleSend = () => {
    const medicines = basket.map((item: Basket) => {
      return {
        medicineId: item.medicineId,
        quantity: medicineQuantities[item.medicineId],
      };
    });
    const request = {
      supplierId: Number(supplierId),
      medicineOrder: medicines,
    };
    dispatch(createOrder(request));
  };

  const handleCancel = () => {
    dispatch(clearBasket());
    navigate(`/${routes.SUPPLIERS}/${supplierId}`);
  };
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div
        className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter scrollbar-thin gap-large p-large sm:flex-row"
        style={{ height: "calc(100% - 125px)" }}
      >
        <div className="sm:w-4/12 min-w-min">
          <div
            className={`p-large h-fit mb-small break-words bg-white
           hover:bg-greyScale-lighter cursor-pointer rounded-med flex flex-col gap-large`}
          >
            <table>
              <tbody className="flex flex-col gap-large">
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    الجهة المستقبلة:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    {supplier !== undefined ? supplier.name : supplierContent}
                  </td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    الجهة المرسلة:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    مستودع محجوب
                  </td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    مكان التوصيل:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    {supplier !== undefined
                      ? supplier.location
                      : supplierContent}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {!isMobile && (
            <div className="flex gap-small">
              <Button
                text="إرسال الطلب"
                variant="base-blue"
                disabled={false}
                size="med"
                style={{ flex: "1" }}
                onClick={handleSend}
              />
              <Button
                text="إلغاء الطلب"
                variant="secondary"
                disabled={false}
                size="med"
                style={{ flex: "1" }}
                onClick={handleCancel}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col h-full bg-white sm:w-8/12 rounded-med p-large">
          <p className="h-10 text-x-large text-greyScale-main">العناصر</p>
          <div className="flex-1 overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
            {medicines}
          </div>
          <div className="flex items-center justify-end w-full pt-large">
            <TextBadge
              className="mx-medium"
              title={`${total} ل.س`}
              status={BadgeStatus.BASE}
            />
          </div>
        </div>
        {isMobile && (
          <div className="flex gap-small">
            <Button
              text="إرسال الطلب"
              variant="base-blue"
              disabled={false}
              size="med"
              style={{ flex: "1" }}
            />
            <Button
              text="إلغاء الطلب"
              variant="secondary"
              disabled={false}
              size="med"
              style={{ flex: "1" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SendOrder;
