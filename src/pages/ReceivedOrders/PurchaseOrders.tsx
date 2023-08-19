import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import { useEffect, useMemo, useState } from "react";
import { Calendar2Event, FunnelFill } from "react-bootstrap-icons";
import { getMonth } from "../../utils/Month";
import TextBadge, { BadgeStatus } from "../../components/Badge/TextBadge";
import { routes } from "../../router/constant";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import Header, { HeaderTypes } from "../../components/Header/Header";
import Menu, { MenuItem, SubMenu } from "../../components/Menu/Menu";
import { SubMenuProvider } from "../../components/Menu/context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "../../components/TextField/TextField";
import { addDays } from "date-fns";
import IconButton from "../../components/Button/IconButton";
import { useMediaQuery } from "react-responsive";
import DatepickerHeader from "../../components/Header/DatepickerHeader";
import {
  findReceivedOrders,
  selectReceivedOrdersData,
  selectReceivedOrdersStatus,
} from "../../redux/orderSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import NoData from "../NoData/NoData";
import { ReceivedTableSchema } from "../../Schema/tables/SendedOrders";
import Beat from "../../components/Loading/Beat";
import { useOpenToggle } from "../../hooks/useOpenToggle";
import { usePagination } from "../../hooks/usePagination";
import { ResponseStatus } from "../../enums/ResponseStatus";
export interface Filter {
  name: string;
  route: string;
}
const filterList: Array<Filter> = [
  { name: "طلبات الشراء", route: `/${routes.PURCHASE_ORDERS}` },
  { name: "طلبات الإرجاع", route: `/${routes.RETURN_ORDERS}` },
];

const PurchaseOrders = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [filtered, setFiltered] = useState<string>(filterList[0].name);
  const { open, handleOpen } = useOpenToggle();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));

  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const { pageIndex, pageSize, pagination, handlePgination } =
    usePagination(10);

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectReceivedOrdersData);
  let content = <NoData />;
  const status = useAppSelector(selectReceivedOrdersStatus);
  const columns = useMemo<ColumnDef<ReceivedTableSchema>[]>(
    () => [
      {
        header: "رقم الطلب",
        cell: (row) => row.renderValue(),
        accessorKey: "id",
      },
      {
        header: "تاريخ الطلب",
        cell: (row) => row.renderValue(),
        accessorKey: "date",
      },
      {
        header: "الجهة المرسلة",
        cell: (row) => row.renderValue(),
        accessorKey: "pharmacy",
      },
      {
        header: "الحالة",
        cell: (row) => row.renderValue(),
        accessorKey: "status",
      },
      {
        header: "الكلفة",
        cell: (row) => row.renderValue(),
        accessorKey: "totalPrice",
      },
    ],
    []
  );
  useEffect(() => {
    dispatch(
      findReceivedOrders({ limit: String(pageSize), page: String(pageIndex) })
    );
  }, [dispatch, pageIndex, pageSize]);
  const transformedData = useMemo(() => {
    return (
      status === ResponseStatus.SUCCEEDED &&
      data.data.length > 0 &&
      data.data.map((order: ReceivedTableSchema) => {
        const state =
          order.status === "Pending" ? (
            <TextBadge title={"معلّق"} status={BadgeStatus.WARNING} />
          ) : order.status === "Accepted" ? (
            <TextBadge title={"تم القبول"} status={BadgeStatus.SUCCESS} />
          ) : order.status === "Delivered" ? (
            <TextBadge title={"تم التسليم"} status={BadgeStatus.DONE} />
          ) : (
            <TextBadge title={"مرفوض"} status={BadgeStatus.DANGER} />
          );
        const date = new Date(order.date);
        return {
          key: order.status,
          id: `#${order.id}`,
          date: `${getMonth(
            date.getMonth() + 1
          )} ${date.getFullYear()}، ${date.getDate()} `,
          status: state,
          pharmacy: order.pharmacy,
          totalPrice: `${order.totalPrice} ل.س`,
        };
      })
    );
  }, [data.data, status]);

  const table = useReactTable({
    data: transformedData,
    columns,
    pageCount: data.totalRecords,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  if (status === ResponseStatus.LOADING) {
    content = <Beat />;
  } else if (status === ResponseStatus.IDLE) {
    content = <NoData />;
  } else if (status === ResponseStatus.FAILED) {
    content = <div>error...</div>;
  }
  const navigate = useNavigate();
  const handleNavigate = (orderId: string) => {
    navigate(`/${routes.PURCHASE_ORDERS}/${orderId.slice(1)}`);
  };

  const handleFilter = (filter: Filter) => {
    setFiltered(filter.name);
    navigate(filter.route);
  };
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="overflow-auto mid scrollbar-none p-large">
        <div className="mid">
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
        <div className="flex gap-small">
          <div className="flex ">
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
                  <MenuItem content="تم التسليم" />
                </SubMenu>
              </SubMenuProvider>
            </Menu>
          </div>
          <DatePicker
            renderCustomHeader={(props) => <DatepickerHeader {...props} />}
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="MMMM d, yyyy"
            customInput={
              <TextField
                startIcon={<Calendar2Event className="border-l pl-x-small" />}
                inputSize="x-large"
                variant="fill"
              />
            }
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large p-large scrollbar-thin">
        <div className="flex flex-col w-full h-full bg-white p-large max-h-fit rounded-small">
          <div className="flex-1 overflow-auto bg-white scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
            <table className="w-full min-w-max">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    className="sticky top-0 bg-greyScale-lighter"
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          className="py-medium px-small text-center min-w-[150px] text-medium text-greyScale-light first:rounded-tr-med first:rounded-br-med last:rounded-tl-med last:rounded-bl-med"
                          key={header.id}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <tr
                        className="transition-colors duration-300 ease-in border-b border-opacity-50 cursor-pointer border-greyScale-light hover:bg-greyScale-lighter"
                        key={row.id}
                        onClick={() => handleNavigate(row.original.id)}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              className="py-medium px-small text-center min-w-[150px] max-w-[150px] font-semibold text-medium text-greyScale-main overflow-hidden text-ellipsis whitespace-nowrap"
                              key={cell.id}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length}>{content}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <CustomPagination
            count={table.getPageCount()}
            page={pageIndex + 1}
            onChange={handlePgination}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;
