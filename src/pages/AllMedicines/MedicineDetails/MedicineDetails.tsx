import { useLocation, useParams } from "react-router-dom";
import { HeaderTitle } from "../../../utils/HeaderTitle";
import { findMedicineInStores } from "../../../Schema/response/medicineInStore.schema";
import { findMedicine } from "../../../Schema/response/medicine.schema";
import Header, { HeaderTypes } from "../../../components/Header/Header";
import { ChevronLeft } from "react-bootstrap-icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { findStore } from "../../../Schema/response/Store.schema";
import Button from "../../../components/Button/Button";
import DeleteMedicine from "../DeleteMedicine/DeleteMedicine";
import EditMedicine from "../EditMedicine/EditMedicine";

interface TableSchema {
  name: string;
  quantity: string;
  owner: string;
  phone: string;
}
const MedicineDetails = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const handleOpenDelete = useCallback(() => {
    setOpenDelete((pre) => !pre);
  }, []);
  const handleOpenEdit = useCallback(() => {
    setOpenEdit((pre) => !pre);
  }, []);
  const { medicineId } = useParams();
  const medicineInStores = findMedicineInStores(medicineId!);
  const medicine = findMedicine(medicineId!);
  const totalQuantity: number = medicineInStores.reduce(
    (acc, medicine) => (acc += medicine.quantity),
    0
  );
  const columns = useMemo<ColumnDef<TableSchema>[]>(
    () => [
      {
        header: "اسم المخزن",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "الكمية المتوافرة",
        cell: (row) => row.renderValue(),
        accessorKey: "quantity",
      },
      {
        header: "اسم مدير المخزن",
        cell: (row) => row.renderValue(),
        accessorKey: "owner",
      },
      {
        header: "رقم الهاتف",
        cell: (row) => row.renderValue(),
        accessorKey: "phone",
      },
    ],
    []
  );

  const tableData: Array<TableSchema> = useMemo(
    () =>
      medicineInStores.map((med) => {
        const store = findStore(med.storeId);
        return {
          name: store.name,
          quantity: `${med.quantity} علبة`,
          owner: store.owner,
          phone: store.phone,
        };
      }),
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header
          title={
            <>
              {title} <ChevronLeft className="w-4 h-4 mx-small" />
              {medicine.name}
            </>
          }
          leftSpace={HeaderTypes.FREE}
        />
        <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter p-large gap-large">
          <div className="flex flex-col items-center justify-center h-full min-h-full overflow-auto bg-white scrollbar-thin gap-large p-large sm:w-4/12 rounded-med">
            <img
              src={medicine.photo}
              alt={medicine.name}
              width={200}
              height={200}
            />
            <table>
              <tbody className="flex flex-col gap-large">
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    اسم الدواء:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    {medicine.name}
                  </td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    الفئة العلاجية:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    {medicine.category}
                  </td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    سعر الشراء:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">{`${medicine.purchasingPrice} ل.س`}</td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    سعر المبيع:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">{`${medicine.sellingPrice} ل.س`}</td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    الشركة المورّدة:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    {medicine.supplier}
                  </td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    الكمية المتوافرة:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">{`${totalQuantity} علبة`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col w-full h-full sm:w-8/12">
            <div className="flex flex-col w-full bg-white p-large h-5/6 max-h-fit rounded-med">
              <p className="text-x-large mb-large text-greyScale-main">
                تفصيل توزيع الكمية على المخازن
              </p>
              <div className="flex-1 overflow-auto bg-white scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
                <table className="w-full min-w-max">
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
            </div>
            <div className="flex items-end justify-end flex-1 gap-small">
              <Button
                text="تعديل"
                variant="base-blue"
                disabled={false}
                size="med"
                onClick={handleOpenEdit}
              />
              <Button
                text="حذف"
                variant="red"
                disabled={false}
                size="med"
                onClick={handleOpenDelete}
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteMedicine open={openDelete} handleOpen={handleOpenDelete} />
      <EditMedicine open={openEdit} handleOpen={handleOpenEdit} />
    </>
  );
};

export default MedicineDetails;
