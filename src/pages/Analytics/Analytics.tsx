import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Header, { HeaderTypes } from "../../components/Header/Header";
import TextBadge, { BadgeStatus } from "../../components/Badge/TextBadge";
import Button from "../../components/Button/Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import {
  findAllPharmaciesPayments,
  findAllSuppliersPayments,
  selectAllPharmaciesPaymentData,
  selectAllPharmaciesPaymentStatus,
  selectAllSuppliersPaymentData,
  selectAllSuppliersPaymentStatus,
} from "../../redux/paymentSlice";
import NoData from "../NoData/NoData";
import { routes } from "../../router/constant";

const schema: Array<{
  pahrmacy: string;
  total: number;
  paid: number;
  dept: number;
}> = [
  {
    pahrmacy: "صيدلية القاسم",
    total: -1000,
    paid: 2000,
    dept: 3000,
  },
  {
    pahrmacy: "صيدلية المنصور",
    total: -1000,
    paid: 2000,
    dept: 3000,
  },
  {
    pahrmacy: "صيدلية القاسم",
    total: -1000,
    paid: 2000,
    dept: 3000,
  },
];
const Analytics = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const paymentPharmaciesStatus = useAppSelector(
    selectAllPharmaciesPaymentStatus
  );
  const paymentSuppliersStatus = useAppSelector(
    selectAllSuppliersPaymentStatus
  );
  const { pageIndex, pageSize, handlePgination } = usePagination(10);
  const {
    pageIndex: pharmacyIndex,
    pageSize: pharmacySize,
    handlePgination: pharmacyHandle,
  } = usePagination(10);
  const pahrmacyRef = useRef<any>(null);
  const supplierRef = useRef<any>(null);
  const pahrmacyContent = useRef<any>(null);
  const supplierContent = useRef<any>(null);
  const [supplierHasMore, setSupplierHasMore] = useState<boolean>(true);
  const [pharmacyHasMore, setPharmacyHasMore] = useState<boolean>(true);
  const [supplierIsFetching, setSupplierIsFetching] = useState<boolean>(true);
  const [pharmacyIsFetching, setPharmacyIsFetching] = useState<boolean>(true);
  const [suppliersPayment, setSuppliersPayment] = useState<any>([]);
  const [pharmaciesPayment, setPharmaciesPayment] = useState<any>([]);
  const fetchSuppliersPayments = useCallback(async () => {
    try {
      const response = await dispatch(
        findAllSuppliersPayments({
          limit: String(pageSize),
          page: String(pageIndex),
        })
      );

      if (response.payload && response.payload.data.length > 0) {
        setSuppliersPayment((prevMedicines: any) => [
          ...prevMedicines,
          ...response.payload.data,
        ]);
        handlePgination(pageIndex + 1);
      } else {
        setSupplierHasMore(false);
        if (suppliersPayment.length === 0) supplierContent.current = <NoData />;
      }
    } catch (error) {
      supplierContent.current = <div>error...</div>;
    } finally {
      setSupplierIsFetching(false);
    }
  }, [suppliersPayment, pageIndex, pageSize, handlePgination, dispatch]);
  const onSupplierIntersection = useCallback(
    (entries: any) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && supplierHasMore && !supplierIsFetching) {
        setSupplierIsFetching(true);

        fetchSuppliersPayments();
      }
    },
    [supplierHasMore, supplierIsFetching, fetchSuppliersPayments]
  );
  const fetchPharmaciesPayment = useCallback(async () => {
    try {
      const response = await dispatch(
        findAllPharmaciesPayments({
          limit: String(pharmacySize),
          page: String(pharmacyIndex),
        })
      );

      if (response.payload && response.payload.data.length > 0) {
        setPharmaciesPayment((prevMedicines: any) => [
          ...prevMedicines,
          ...response.payload.data,
        ]);
        pharmacyHandle(pharmacyIndex + 1);
      } else {
        setPharmacyHasMore(false);
        if (pharmaciesPayment.length === 0)
          pahrmacyContent.current = <NoData />;
      }
    } catch (error) {
      pahrmacyContent.current = <div>حدث خطا ما...</div>;
    } finally {
      setPharmacyIsFetching(false);
    }
  }, [
    pharmaciesPayment,
    pharmacyIndex,
    pharmacySize,
    pharmacyHandle,
    dispatch,
  ]);
  const onPharmacyIntersection = useCallback(
    (entries: any) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && pharmacyHasMore && !pharmacyIsFetching) {
        setSupplierIsFetching(true);

        fetchPharmaciesPayment();
      }
    },
    [pharmacyHasMore, pharmacyIsFetching, fetchPharmaciesPayment]
  );
  useEffect(() => {
    const supplierObserver = new IntersectionObserver(onSupplierIntersection);
    const pharmacyObserver = new IntersectionObserver(onPharmacyIntersection);
    if (supplierObserver && supplierRef.current) {
      supplierObserver.observe(supplierRef.current);
    }

    if (pharmacyObserver && pahrmacyRef.current) {
      pharmacyObserver.observe(pahrmacyRef.current);
    }

    return () => {
      if (supplierObserver) supplierObserver.disconnect();
      if (pharmacyObserver) pharmacyObserver.disconnect();
    };
  }, [onSupplierIntersection, onPharmacyIntersection]);

  const handleNavigate = (userId: number) => {
    navigate(`/${routes.INVOICES}/${userId}`);
  };
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="flex flex-col flex-1 overflow-auto gap-large scrollbar-thin px-xx-large py-large bg-greyScale-lighter">
        <div className="grid grid-cols-2 gap-large md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              رأس المال المقبوض
            </p>
            <TextBadge title={`600000000 ل.س`} status={BadgeStatus.SUCCESS} />
          </span>
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              رأس المال غير المقبوض
            </p>
            <TextBadge title={`60000000 ل.س`} status={BadgeStatus.DANGER} />
          </span>
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              قيمة الأدوية المخزنة في المستودع
            </p>
            <TextBadge title={`600000000 ل.س`} status={BadgeStatus.WARNING} />
          </span>
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              المربح الصافي المقبوض
            </p>
            <TextBadge title={`600000000 ل.س`} status={BadgeStatus.SUCCESS} />
          </span>
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              المربح الصافي غير المقبوض
            </p>
            <TextBadge title={`600000000 ل.س`} status={BadgeStatus.DANGER} />
          </span>
        </div>
        <div className="flex-1 bg-white p-large rounded-med">
          <p className="text-greyScale-main">الحسابات مع المورّدين</p>
          <div className="flex flex-col overflow-auto divide-y max-h-80 scrollbar-none gap-medium">
            {schema.map((item, index: number) => {
              return (
                <div className="w-full bg-white p-large rounded-small">
                  <div className="flex items-center justify-between pb-small">
                    <span className="flex text-x-large text-greyScale-main">
                      <p>{index < 10 ? `0${index}` : index}</p>
                      <p className="px-medium">{item.pahrmacy}</p>
                    </span>
                    <Button
                      variant="text"
                      disabled={false}
                      text="عرض التفاصيل"
                      size="med"
                      onClick={() => handleNavigate(index)}
                    />
                  </div>
                  <div className="justify-between leading-loose bg-greyScale-lighter h-fit rounded-small p-large sm:flex">
                    <span className="flex flex-col items-center grow">
                      <p className="text-small text-greyScale-light">
                        المبلغ الكلي
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.dept)}
                          status={BadgeStatus.DONE}
                        />
                      </p>
                    </span>
                    <span className="flex flex-col items-center grow border-y sm:border-x sm:border-y-0 border-greyScale-light">
                      <p className="text-small text-greyScale-light">
                        المبلغ المدفوع
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.paid)}
                          status={BadgeStatus.SUCCESS}
                        />
                      </p>
                    </span>
                    <span className="flex flex-col items-center grow">
                      <p className="text-small text-greyScale-light">
                        المبلغ المتبقي
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.total)}
                          status={BadgeStatus.DANGER}
                        />
                      </p>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white p-large rounded-med mt-large">
          <p className="text-greyScale-main">الحسابات مع الصيدليات</p>
          <div className="flex flex-col overflow-auto divide-y max-h-80 scrollbar-none gap-medium">
            {schema.map((item, index: number) => {
              return (
                <div className="w-full bg-white p-large rounded-small">
                  <div className="flex items-center justify-between pb-small">
                    <span className="flex text-x-large text-greyScale-main">
                      <p>{index < 10 ? `0${index}` : index}</p>
                      <p className="px-medium">{item.pahrmacy}</p>
                    </span>
                    <Button
                      variant="text"
                      disabled={false}
                      text="عرض التفاصيل"
                      size="med"
                      onClick={() => handleNavigate(index)}
                    />
                  </div>
                  <div className="justify-between leading-loose bg-greyScale-lighter h-fit rounded-small p-large sm:flex">
                    <span className="flex flex-col items-center grow">
                      <p className="text-small text-greyScale-light">
                        المبلغ الكلي
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.dept)}
                          status={BadgeStatus.DONE}
                        />
                      </p>
                    </span>
                    <span className="flex flex-col items-center grow border-y sm:border-x sm:border-y-0 border-greyScale-light">
                      <p className="text-small text-greyScale-light">
                        المبلغ المدفوع
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.paid)}
                          status={BadgeStatus.SUCCESS}
                        />
                      </p>
                    </span>
                    <span className="flex flex-col items-center grow">
                      <p className="text-small text-greyScale-light">
                        المبلغ المتبقي
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.total)}
                          status={BadgeStatus.DANGER}
                        />
                      </p>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
