import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { routes } from "../../router/constant";
import Header, { HeaderTypes } from "../../components/Header/Header";
import DestinationCard from "../../components/DestinationCard/DestinationCard";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import { getMonth } from "../../utils/Month";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  acceptReturnOrders,
  findReceivedReturnOrders,
  rejectReturnOrders,
  selectAcceptReturnOrdersStatus,
  selectReceivedReturnOrdersStatus,
  selectRejectReturnOrdersStatus,
} from "../../redux/orderSlice";
import { usePagination } from "../../hooks/usePagination";
import NoData from "../NoData/NoData";
import Beat from "../../components/Loading/Beat";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ResponseStatus } from "../../enums/ResponseStatus";
import TextBadge, { BadgeStatus } from "../../components/Badge/TextBadge";
import { SubMenuProvider } from "../../components/Menu/context";
import Menu, { MenuItem, SubMenu } from "../../components/Menu/Menu";
import { FunnelFill } from "react-bootstrap-icons";
import IconButton from "../../components/Button/IconButton";
import { useMediaQuery } from "react-responsive";
import { useOpenToggle } from "../../hooks/useOpenToggle";
import {
  MedicineInReceivedReturnOrder,
  ReceivedReturnOrder,
} from "../../Schema/Responses/ReceivedOrder";
const NotFound = require("./../../assets/medicines/not-found.png");

interface Filter {
  name: string;
  route: string;
}
const filterList: Array<Filter> = [
  { name: "طلبات الشراء", route: `/${routes.PURCHASE_ORDERS}` },
  { name: "طلبات الإرجاع", route: `/${routes.RETURN_ORDERS}` },
];

const ReturnOrders = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { open, handleOpen } = useOpenToggle();
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [filtered, setFiltered] = useState<string>(filterList[1].name);

  const navigate = useNavigate();
  const handleFilter = (filter: Filter) => {
    setFiltered(filter.name);
    navigate(filter.route);
  };

  const [orders, setOrders] = useState<ReceivedReturnOrder[]>([]);
  console.log(orders);
  const [selectedReport, setselectedReport] = useState<{
    index: number;
    medicine: MedicineInReceivedReturnOrder;
    reason: string;
  }>();
  const handleSelectOrder = (
    id: number,
    medicine: MedicineInReceivedReturnOrder,
    reason: string
  ) => {
    setselectedReport({
      index: id,
      medicine,
      reason,
    });
  };
  const { pageIndex, pageSize, handlePgination } = usePagination(1);

  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const endRef = useRef<any>(null);
  const content = useRef<any>(null);
  const ordersStatus = useAppSelector(selectReceivedReturnOrdersStatus);
  const acceptStatus = useAppSelector(selectAcceptReturnOrdersStatus);
  const rejectStatus = useAppSelector(selectRejectReturnOrdersStatus);

  useEffect(() => {
    if (ordersStatus === ResponseStatus.SUCCEEDED) {
      orders.length > 0 &&
        setselectedReport({
          index: orders[0].id,
          medicine: orders[0].medicine,
          reason: orders[0].reason,
        });
    }
  }, [ordersStatus, orders]);
  const fetchReturnOrders = useCallback(async () => {
    try {
      const response = await dispatch(
        findReceivedReturnOrders({
          limit: String(pageSize),
          page: String(pageIndex),
        })
      );

      if (response.payload && response.payload.data.length > 0) {
        setOrders((prevMedicines: ReceivedReturnOrder[]) => [
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
        <div>
          {isMobile ? (
            <IconButton
              color="light-grey"
              icon={<FunnelFill fontSize="small" />}
              onClick={handleOpen}
            />
          ) : (
            <Button
              variant="light-grey"
              disabled={false}
              text="تصنيف"
              start={true}
              icon={<FunnelFill fontSize="small" />}
              size="med"
              onClick={handleOpen}
            />
          )}

          <Menu divide={true} open={open}>
            <SubMenuProvider>
              <SubMenu title="الحالة">
                <MenuItem content="مرفوض" />
                <MenuItem content="مُعلق" />
                <MenuItem content="تم القبول" />
              </SubMenu>
            </SubMenuProvider>
          </Menu>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large p-large scrollbar-thin">
        <div className="flex overflow-auto bg-white basis-auto shrink-0 sm:h-full sm:max-h-fit sm:flex-col gap-large p-medium scrollbar-thin sm:w-1/2 rounded-med">
          {orders.length > 0
            ? orders.map((order: ReceivedReturnOrder) => {
                const date = new Date(order.reportDate);
                const reportDate = `${getMonth(
                  date.getMonth() + 1
                )} ${date.getFullYear()}، ${date.getDate()} `;
                return (
                  <div
                    key={order.id}
                    className="border-l pl-large sm:border-l-0 sm:pl-0 sm:border-b sm:pb-large"
                  >
                    <DestinationCard
                      flag={
                        order.status === "Accepted" ? (
                          <TextBadge
                            title={"مقبول"}
                            status={BadgeStatus.SUCCESS}
                          />
                        ) : order.status === "Pending" ? (
                          <TextBadge
                            title={"معلّق"}
                            status={BadgeStatus.WARNING}
                          />
                        ) : (
                          <TextBadge
                            title={"مرفوض"}
                            status={BadgeStatus.DANGER}
                          />
                        )
                      }
                      title={order.pharmacy.name}
                      subTitle={order.pharmacy.location}
                      date={reportDate}
                      email={order.pharmacy.email}
                      phone={order.pharmacy.phoneNumber}
                      inactive={selectedReport?.index !== order.id}
                      handleActive={() =>
                        handleSelectOrder(
                          order.id,
                          order.medicine,
                          order.reason
                        )
                      }
                      action={
                        order.status === "Pending" && (
                          <div className="flex flex-1 gap-small">
                            <Button
                              text="قبول الطلب"
                              variant="base-blue"
                              disabled={false}
                              size="med"
                              style={{ flex: "1" }}
                              onClick={() =>
                                handleAcceptOrder(String(order.id))
                              }
                              status={acceptStatus}
                            />
                            <Button
                              text="رفض الطلب"
                              variant="red"
                              disabled={false}
                              style={{ flex: "1" }}
                              size="med"
                              onClick={() =>
                                handleRejectOrder(String(order.id))
                              }
                              status={rejectStatus}
                            />
                          </div>
                        )
                      }
                    />
                  </div>
                );
              })
            : content.current}
          {hasMore && <Beat ref={endRef} />}
        </div>
        <div className="flex flex-col flex-1 bg-white sm:h-full sm:w-1/2 rounded-med p-large">
          <div>
            {selectedReport && (
              <MedicineCard
                key={selectedReport.medicine.batchId}
                name={selectedReport.medicine.name}
                subtitle={`الدفعة: ${selectedReport.medicine.batchId}`}
                photoAlt={selectedReport.medicine.name}
                photoSrc={
                  selectedReport.medicine.imageUrl !== null
                    ? selectedReport.medicine.imageUrl
                    : NotFound
                }
              />
            )}
          </div>
          <div className="flex flex-col flex-1 border h-4/6 gap-small border-greyScale-light rounded-med p-large">
            {selectedReport && (
              <>
                <p className="text-primary-main text-medium">السبب:</p>
                <p className="overflow-auto text-greyScale-dark text-large scrollbar-thin">
                  {selectedReport.reason}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnOrders;
