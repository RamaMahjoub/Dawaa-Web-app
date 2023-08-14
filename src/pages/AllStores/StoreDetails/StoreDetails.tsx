import { ChevronLeft, Search } from "react-bootstrap-icons";
import TextField from "../../../components/TextField/TextField";
import { useLocation, useParams } from "react-router-dom";
import { HeaderTitle } from "../../../utils/HeaderTitle";
import { findStore } from "../../../Schema/response/Store.schema";
import Button from "../../../components/Button/Button";
import { ReactNode, useMemo, useState } from "react";
import { storesMedicinesData } from "../../../Schema/response/medicineInStore.schema";
import { findMedicine } from "../../../Schema/response/medicine.schema";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Header, { HeaderTypes } from "../../../components/Header/Header";

const filterList = ["جميع الأدوية", "متوافر", "على وشك النفاذ", "نافذ"];
interface TableSchema {
  name: string;
  category: string;
  supplier: string;
  state: ReactNode;
  quantity: string;
  purchasingPrice: string;
  sellingPrice: string;
}

const StoreDetails = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { storeId } = useParams();
  const store = findStore(storeId!);
  const [filtered, setFiltered] = useState(filterList[0]);
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
        header: "اسم الدواء",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "الفئة العلاجية",
        cell: (row) => row.renderValue(),
        accessorKey: "category",
      },
      {
        header: "المصدر المورد",
        cell: (row) => row.renderValue(),
        accessorKey: "supplier",
      },
      {
        header: "الحالة",
        cell: (row) => row.renderValue(),
        accessorKey: "state",
      },
      {
        header: "الكمية المتوافرة",
        cell: (row) => row.renderValue(),
        accessorKey: "quantity",
      },
      {
        header: "سعر الشراء",
        cell: (row) => row.renderValue(),
        accessorKey: "purchasingPrice",
      },
      {
        header: "سعر المبيع",
        cell: (row) => row.renderValue(),
        accessorKey: "sellingPrice",
      },
    ],
    []
  );
  const tableData: Array<TableSchema> = storesMedicinesData.map((med) => {
    const medicine = findMedicine(med.medicineId);
    return {
      name: medicine.name,
      category: medicine.category,
      supplier: medicine.supplier,
      state: med.state,
      quantity: `${med.quantity} علبة`,
      purchasingPrice: `${medicine.purchasingPrice} ل.س`,
      sellingPrice: `${medicine.sellingPrice} ل.س`,
    };
  });
  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: Math.ceil(storesMedicinesData.length / pageSize),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });
  return (
    <div className="flex flex-col h-screen">
      <Header
        title={
          <>
            {title} <ChevronLeft className="w-4 h-4 mx-small" /> {store.name}
          </>
        }
        action={
          <TextField
            startIcon={<Search />}
            placeholder="بحث"
            inputSize="large"
          />
        }
        leftSpace={HeaderTypes.ALL}
      />
      <div className="overflow-auto mid scrollbar-none p-large">
        {filterList.map((filter) => (
          <Button
            key={filter}
            variant={`${filtered === filter ? "active-text" : "text"}`}
            disabled={false}
            text={filter}
            size="med"
            className="min-w-max"
            onClick={() => setFiltered(filter)}
          />
        ))}
      </div>
      <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large p-large scrollbar-thin">
        <div className="flex flex-col w-full h-full bg-white p-large max-h-fit rounded-small">
          <div className="flex-1 overflow-auto bg-white scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
            <table style={{ minWidth: "max-content" }}>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="sticky top-0 bg-greyScale-lighter"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className="py-medium px-small text-center min-w-[150px] text-medium text-greyScale-light first:rounded-tr-med first:rounded-br-med last:rounded-tl-med last:rounded-bl-med"
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
                      key={row.id}
                      className="transition-colors duration-300 ease-in border-b border-opacity-50 cursor-pointer border-greyScale-light hover:bg-greyScale-lighter"
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="py-medium px-small text-center min-w-[150px] max-w-[150px] font-semibold text-medium text-greyScale-main overflow-hidden text-ellipsis whitespace-nowrap"
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
          {/* <CustomPagination page={pageIndex} count={table.getPageCount()} /> */}
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
