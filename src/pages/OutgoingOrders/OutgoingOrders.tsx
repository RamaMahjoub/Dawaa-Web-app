import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import { ReactNode, useMemo, useState } from "react";
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { data } from "../../Schema/response/outgoingOrders.schema";
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
interface TableSchema {
  id: string;
  requestDate: string;
  to: string;
  payment: ReactNode;
  state: ReactNode;
  cost: string;
}
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
        accessorKey: "requestDate",
      },
      {
        header: "الجهة المستلمة",
        cell: (row) => row.renderValue(),
        accessorKey: "to",
      },
      {
        header: "الدفع",
        cell: (row) => row.renderValue(),
        accessorKey: "payment",
      },
      {
        header: "الحالة",
        cell: (row) => row.renderValue(),
        accessorKey: "state",
      },
      {
        header: "الكلفة",
        cell: (row) => row.renderValue(),
        accessorKey: "cost",
      },
    ],
    []
  );
  const tableData: Array<TableSchema> = data.map((order) => {
    let cost: number = order.medicines.reduce(
      (acc, medicine) =>
        (acc += medicine.medicine.sellingPrice * medicine.quantity),
      0
    );
    const state =
      order.state === "تم التوصيل" ? (
        <TextBadge title={order.state} status={BadgeStatus.SUCCESS} />
      ) : order.state === "معلّق" ? (
        <TextBadge title={order.state} status={BadgeStatus.WARNING} />
      ) : (
        <TextBadge title={order.state} status={BadgeStatus.DANGER} />
      );
    let payment: number = order.paymment.reduce(
      (acc, pay) => (acc += pay.amount),
      0
    );

    return {
      id: order.id,
      requestDate: `${getMonth(
        order.requestDate.getMonth()
      )} ${order.requestDate.getFullYear()}، ${order.requestDate.getDate()} `,
      payment:
        payment !== cost ? (
          <p className="text-red-main">غير مكتمل</p>
        ) : (
          <p className="text-green-main">مكتمل</p>
        ),
      state,
      to: order.to.name,
      cost: `${cost} ل.س`,
    };
  });
  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: Math.ceil(tableData.length / pageSize),
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
    navigate(`/${routes.OUTGOING_ORDERS}/${orderId}`);
  };
  return (
    <div className="h-screen flex flex-col">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="mid overflow-auto scrollbar-none p-large">
        <div className="flex gap-small sm:justify-end flex-1 ">
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
                <SubMenu title="الدفع">
                  <MenuItem content="مكتمل" />
                  <MenuItem content="غير مكتمل" />
                </SubMenu>
              </SubMenuProvider>
              <SubMenuProvider>
                <SubMenu title="الحالة">
                  <MenuItem content="مُلغى" />
                  <MenuItem content="مُعلق" />
                  <MenuItem content="تم الاستلام" />
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
                startIcon={<Calendar2Event className="pl-x-small border-l" />}
                inputSize="x-large"
                variant="fill"
                value={"rama"}
              />
            }
          />
        </div>
      </div>
      <div className="flex-1 bg-greyScale-lighter gap-large flex p-large overflow-auto scrollbar-thin">
        <div className="p-large h-full w-full flex flex-col max-h-fit bg-white rounded-small">
          <div className="bg-white flex-1  overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
            <table style={{ minWidth: "max-content" }} className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    className="bg-greyScale-lighter sticky top-0"
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
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      className="border-b border-greyScale-light border-opacity-50 transition-colors duration-300 ease-in hover:bg-greyScale-lighter cursor-pointer"
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
                })}
              </tbody>
            </table>
          </div>
          <CustomPagination page={pageIndex} count={table.getPageCount()} />
        </div>
      </div>
    </div>
  );
};

export default OutgoingOrders;
