import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { routes } from "../../router/constant";
import Header, { HeaderTypes } from "../../components/Header/Header";
import { data, findReport } from "../../Schema/response/medicineReport.schema";

import DestinationCard from "../../components/DestinationCard/DestinationCard";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import {
  MedicineSchema,
  findMedicine,
} from "../../Schema/response/medicine.schema";
import { getMonth } from "../../utils/Month";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  acceptReturnOrders,
  findReceivedReturnOrders,
  rejectReturnOrders,
} from "../../redux/orderSlice";
import { usePagination } from "../../hooks/usePagination";
import NoData from "../NoData/NoData";
import Beat from "../../components/Loading/Beat";
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

  const navigate = useNavigate();
  const handleFilter = (filter: Filter) => {
    setFiltered(filter.name);
    navigate(filter.route);
  };

  const [selectedReport, setselectedReport] = useState<{
    index: number;
    reportId: string;
    medicine: MedicineSchema;
    reason: string;
  }>({
    index: 0,
    reportId: data[0].id,
    medicine: findMedicine(data[0].medicineId),
    reason: data[0].reason,
  });
  // const handleSelectOrder = useCallback((index: number, reportId: string) => {
  //   const report = findReport(reportId);
  //   const medicine = findMedicine(report.medicineId);
  //   setselectedReport({ index, reportId, medicine, reason: report.reason });
  // }, []);
  const { pageIndex, pageSize, pagination, handlePgination } =
    usePagination(10);

  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<any>([]);
  const [hasMore, setHasMore] = useState<any>(true);
  const [isFetching, setIsFetching] = useState<any>(false);
  const endRef = useRef<any>(null);
  const content = useRef<any>(null);
  const fetchReturnOrders = useCallback(async () => {
    try {
      const response = await dispatch(
        findReceivedReturnOrders({
          limit: String(pageSize),
          page: String(pageIndex),
        })
      );

      if (response.payload && response.payload.data.length > 0) {
        setOrders((prevMedicines: any) => [
          ...prevMedicines,
          ...response.payload.data,
        ]);
        handlePgination(pageIndex + 1);
      } else {
        setHasMore(false);
        if (orders.length === 0) content.current = <NoData />;
      }
    } catch (error) {
      content.current = <div>error...</div>;
    } finally {
      setIsFetching(false);
    }
  }, [orders, pageIndex, pageSize, handlePgination, dispatch]);

  const onIntersection = useCallback(
    (entries: any) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !isFetching) {
        setIsFetching(true);

        fetchReturnOrders();
      }
    },
    [hasMore, isFetching, fetchReturnOrders]
  );
  useEffect(() => {
    console.log("from effect");
    const observer = new IntersectionObserver(onIntersection);
    if (observer && endRef.current) {
      observer.observe(endRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [onIntersection]);

  const handleAcceptOrder = async (id: string) => {
    dispatch(acceptReturnOrders({ id }));
  };

  const handleRejectOrder = async (id: string) => {
    dispatch(rejectReturnOrders({ id }));
  };
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="overflow-auto mid scrollbar-none p-large">
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
      <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large p-large scrollbar-thin">
        <div className="flex overflow-auto bg-white basis-auto shrink-0 sm:h-full sm:max-h-fit sm:flex-col gap-large p-medium scrollbar-thin sm:w-1/2 rounded-med">
          {orders.length > 0
            ? orders.data.map((order: any) => {
                const reportDate = `${getMonth(
                  order.reportDate.getMonth() + 1
                )} ${order.reportDate.getFullYear()}، ${order.reportDate.getDate()} `;
                return (
                  <div
                    key={order.id}
                    className="border-l pl-large sm:border-l-0 sm:pl-0 sm:border-b sm:pb-large"
                  >
                    <DestinationCard
                      title={order.pharmacy.name}
                      subTitle={order.pharmacy.location}
                      date={reportDate}
                      email={order.pharmacy.email}
                      phone={order.pharmacy.phoneNumber}
                      inactive={selectedReport?.index !== order.id}
                      // handleActive={() => handleSelectOrder(order.id)}
                      action={
                        <div className="flex flex-1 gap-small">
                          <Button
                            text="قبول الطلب"
                            variant="base-blue"
                            disabled={false}
                            size="med"
                            style={{ flex: "1" }}
                            onClick={() => handleAcceptOrder(order.id)}
                          />
                          <Button
                            text="رفض الطلب"
                            variant="red"
                            disabled={false}
                            style={{ flex: "1" }}
                            size="med"
                            onClick={() => handleRejectOrder(order.id)}
                          />
                        </div>
                      }
                    />
                  </div>
                );
              })
            : content.current}
            {hasMore && <Beat ref={endRef} />}
        </div>
        {selectedReport !== undefined && (
          <div className="flex flex-col flex-1 bg-white sm:h-full sm:w-1/2 rounded-med p-large">
            <div>
              <MedicineCard
                key={selectedReport.medicine.medicineId}
                name={selectedReport.medicine.name}
                subtitle={`الدفعة: ${selectedReport.medicine.batchId}`}
                photoAlt={selectedReport.medicine.name}
                photoSrc={selectedReport.medicine.photo}
              />
            </div>
            <div className="flex flex-col flex-1 border h-4/6 gap-small border-greyScale-light rounded-med p-large">
              <p className="text-primary-main text-medium">السبب:</p>
              <p className="overflow-auto text-greyScale-dark text-large scrollbar-thin">
                {selectedReport.reason}
                {selectedReport.reason}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnOrders;
