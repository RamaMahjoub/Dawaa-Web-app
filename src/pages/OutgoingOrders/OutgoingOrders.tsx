import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TextBadge, { BadgeStatus } from "../../components/Badge/TextBadge";
import { getMonth } from "../../utils/Month";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { Calendar2Event, FunnelFill } from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import { routes } from "../../router/constant";
import Header, { HeaderTypes } from "../../components/Header/Header";
import Menu, { MenuItem, SubMenu } from "../../components/Menu/Menu";
import { SubMenuProvider } from "../../components/Menu/context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "../../components/TextField/TextField";
import { addDays } from "date-fns";
import DatepickerHeader from "../../components/Header/DatepickerHeader";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  findSendedOrders,
  selectSendedOrdersData,
  selectSendedOrdersStatus,
} from "../../redux/orderSlice";
import { TableSchema } from "../../Schema/tables/SendedOrders";
import Beat from "../../components/Loading/Beat";
import NoData from "../NoData/NoData";

const OutgoingOrders = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [open, setOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));
  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleOpen = () => {
    setOpen((pre) => !pre);
  };
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectSendedOrdersData);
  let content = <NoData />;
  const status = useAppSelector(selectSendedOrdersStatus);
  const columns = useMemo<ColumnDef<TableSchema>[]>(
    () => [
      {
        header: "رقم الطلب",
        cell: (row) => row.renderValue(),
        accessorKey: "id",
      },
      {
        header: "تاريخ الطلب",
        cell: (row) => row.renderValue(),
        accessorKey: "orderDate",
      },
      {
        header: "الجهة المستلمة",
        cell: (row) => row.renderValue(),
        accessorKey: "supplierName",
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
      findSendedOrders({ limit: String(pageSize), page: String(pageIndex) })
    );
  }, [dispatch, pageIndex, pageSize]);
  const transformedData = useMemo(() => {
    return (
      status === "succeeded" &&
      data.data.length > 0 &&
      data.data.map((order: TableSchema, index: number) => {
        const state =
          order.status === "Pending" ? (
            <TextBadge title={"معلّق"} status={BadgeStatus.WARNING} />
          ) : order.status === "Accepted" ? (
            <TextBadge title={"تم القبول"} status={BadgeStatus.SUCCESS} />
          ) : order.status === "Delivered" ? (
            <TextBadge title={"تم الاستلام"} status={BadgeStatus.DONE} />
          ) : (
            <TextBadge title={"مرفوض"} status={BadgeStatus.DANGER} />
          );
        const date = new Date(order.orderDate);
        return {
          id: `#${order.id}`,
          orderDate: `${getMonth(
            date.getMonth() + 1
          )} ${date.getFullYear()}، ${date.getDate()} `,
          status: state,
          supplierName: order.supplierName,
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
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });
  const navigate = useNavigate();
  const handleNavigate = (orderId: string) => {
    navigate(`/${routes.OUTGOING_ORDERS}/${orderId.slice(1)}`);
  };
  const handlePgination = (newPageIndex: number) => {
    setPagination((pre) => ({ ...pre, pageIndex: newPageIndex }));
  };
  if (status === "loading") {
    content = <Beat />;
  } else if (status === "idle") {
    content = <NoData />;
  } else if (status === "failed") {
    content = <div>error...</div>;
  }
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="overflow-auto mid scrollbar-none p-large">
        <div className="flex flex-1 gap-small sm:justify-end ">
          <div className="flex ">
            <Button
              variant="light-grey"
              disabled={false}
              text="تصنيف"
              start={true}
              icon={<FunnelFill fontSize="small" />}
              size="med"
              onClick={handleOpen}
            />
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
      <div className="flex flex-1 overflow-auto bg-greyScale-lighter gap-large p-large scrollbar-thin">
        <div className="flex flex-col w-full h-full bg-white p-large max-h-fit rounded-small">
          <div className="flex-1 overflow-auto bg-white scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
            <table style={{ minWidth: "max-content" }} className="w-full h-full">
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

export default OutgoingOrders;
