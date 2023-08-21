import { useLocation, useParams } from "react-router-dom";
import { HeaderTitle } from "../../../utils/HeaderTitle";
import Header, { HeaderTypes } from "../../../components/Header/Header";
import { ChevronLeft } from "react-bootstrap-icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button/Button";
import DeleteMedicine from "../DeleteMedicine/DeleteMedicine";
import EditMedicine from "../EditMedicine/EditMedicine";
import { useOpenToggle } from "../../../hooks/useOpenToggle";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  findMedicineDetails,
  findMedicineDistributions,
  findMedicinnBatches,
  selectMedicineBatchesData,
  selectMedicineBatchesStatus,
  selectMedicineDetailsData,
  selectMedicineDetailsStatus,
  selectMedicineDistributionsData,
  selectMedicineDistributionsStatus,
} from "../../../redux/medicineSlice";
import Beat from "../../../components/Loading/Beat";
import NoData from "../../NoData/NoData";
import { ResponseStatus } from "../../../enums/ResponseStatus";
import { Medicine, MedicineDistribution } from "../../../Schema/Responses/Medicine";
import { Batch } from "../../../Schema/Responses/Batch";

const NotFound = require("./../../../assets/medicines/not-found.png");
interface TableSchema {
  inventoryName: string;
  quantity: string;
  inventoryOwner: string;
}

interface TableSchema2 {
  id: number;
  quantity: string;
}

const MedicineDetails = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { open: openDelete, handleOpen: handleOpenDelete } = useOpenToggle();
  const { open: openEdit, handleOpen: handleOpenEdit } = useOpenToggle();

  const { medicineId } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectMedicineDetailsData);
  const status = useAppSelector(selectMedicineDetailsStatus);
  const distributionsData = useAppSelector(selectMedicineDistributionsData);
  const distributionsStatus = useAppSelector(selectMedicineDistributionsStatus);
  const batchesStatus = useAppSelector(selectMedicineBatchesStatus);
  const batchesData = useAppSelector(selectMedicineBatchesData);
  const [med, setMed] = useState<Medicine>();
  useEffect(() => {
    Promise.all([
      dispatch(findMedicineDetails({ id: medicineId! })),
      dispatch(findMedicineDistributions({ id: medicineId! })),
      dispatch(findMedicinnBatches({ id: medicineId! })),
    ]);
  }, [dispatch, medicineId]);
  console.log(batchesData, distributionsData, med);
  let content = <NoData />,
    distributionsContent = <NoData />,
    batchesInWarehouseContent = <NoData />;
  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) {
      setMed(data.data);
    }
  }, [status, data]);

  if (status === ResponseStatus.LOADING) {
    content = <Beat />;
  } else if (status === ResponseStatus.FAILED) {
    content = <div>حدث خطأ ما...</div>;
  }

  if (distributionsStatus === ResponseStatus.LOADING) {
    distributionsContent = <Beat />;
  } else if (distributionsStatus === ResponseStatus.FAILED) {
    distributionsContent = <div>حدث خطأ ما...</div>;
  }

  if (batchesStatus === ResponseStatus.LOADING) {
    batchesInWarehouseContent = <Beat />;
  } else if (batchesStatus === ResponseStatus.FAILED) {
    batchesInWarehouseContent = <div>حدث خطأ ما...</div>;
  }

  const inventoriesDistribution = useMemo<ColumnDef<TableSchema>[]>(
    () => [
      {
        header: "اسم المخزن",
        cell: (row) => row.renderValue(),
        accessorKey: "inventoryName",
      },
      {
        header: "الكمية المتوافرة",
        cell: (row) => row.renderValue(),
        accessorKey: "quantity",
      },
      {
        header: "اسم مدير المخزن",
        cell: (row) => row.renderValue(),
        accessorKey: "inventoryOwner",
      },
    ],
    []
  );

  const batchesInWarehouse = useMemo<ColumnDef<TableSchema2>[]>(
    () => [
      {
        header: "رقم الدفعة",
        cell: (row) => row.renderValue(),
        accessorKey: "id",
      },
      {
        header: "الكمية المتوافرة",
        cell: (row) => row.renderValue(),
        accessorKey: "quantity",
      },
    ],
    []
  );

  const inventoriesDistributionData: Array<TableSchema> = useMemo(() => {
    return distributionsStatus === ResponseStatus.SUCCEEDED &&
      distributionsData.data
      ? distributionsData.data.map((item: MedicineDistribution) => {
          return {
            inventoryName: item.inventoryName,
            quantity: `${item.quantity} علبة`,
            inventoryOwner: item.inventoryOwner,
          };
        })
      : [];
  }, [distributionsData, distributionsStatus]);

  const batchesInWarehouseData: Array<TableSchema2> = useMemo(() => {
    return batchesStatus === "succeeded" && batchesData.data
      ? batchesData.data.map((item: Batch) => {
          return {
            id: item.id,
            quantity: `${item.quantity} علبة`,
          };
        })
      : [];
  }, [batchesData, batchesStatus]);

  const inventoriesDistributionTable = useReactTable({
    data: inventoriesDistributionData,
    columns: inventoriesDistribution,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });
  const batchesInWarehouseTabel = useReactTable({
    data: batchesInWarehouseData,
    columns: batchesInWarehouse,
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
              {med !== undefined && med.name}
            </>
          }
          leftSpace={HeaderTypes.FREE}
        />
        <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter p-large gap-large">
          <div className="flex flex-col items-center justify-center h-full min-h-full overflow-auto bg-white scrollbar-thin gap-large p-large sm:w-4/12 rounded-med">
            <img
              src={
                med === undefined
                  ? NotFound
                  : med.imageUrl !== undefined
                  ? med.imageUrl
                  : NotFound
              }
              alt={med !== undefined ? med.name : "not-found"}
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
                    {med !== undefined ? med.name : content}
                  </td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    الفئة العلاجية:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    {med !== undefined ? med.category : content}
                  </td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    سعر المبيع:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    {med !== undefined ? `${med.price} ل.س` : content}
                  </td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    الشركة المورّدة:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    {med !== undefined ? med.supplier : content}
                  </td>
                </tr>
                <tr>
                  <td className="w-24 text-greyScale-light text-medium">
                    الكمية المتوافرة:
                  </td>
                  <td className="break-words text-greyScale-main text-medium">
                    {med !== undefined ? `${med.quantity} علبة` : content}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col w-full h-full sm:w-8/12 gap-medium">
            <div className="flex flex-col w-full bg-white p-large h-2/5 max-h-fit rounded-med">
              <p className="text-x-large mb-large text-greyScale-main">
                تفصيل توزيع الكمية على المخازن
              </p>
              <div className="flex-1 overflow-auto bg-white scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
                <table className="w-full min-w-max">
                  <thead>
                    {inventoriesDistributionTable
                      .getHeaderGroups()
                      .map((headerGroup) => (
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
                    {inventoriesDistributionTable.getRowModel().rows.length >
                    0 ? (
                      inventoriesDistributionTable
                        .getRowModel()
                        .rows.map((row) => {
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
                        })
                    ) : (
                      <tr>
                        <td colSpan={inventoriesDistribution.length}>
                          {distributionsContent}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col w-full bg-white p-large h-2/5 max-h-fit rounded-med">
              <p className="text-x-large mb-large text-greyScale-main">
                الكمية الموجودة في المستودع
              </p>
              <div className="flex-1 overflow-auto bg-white scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
                <table className="w-full min-w-max">
                  <thead>
                    {batchesInWarehouseTabel
                      .getHeaderGroups()
                      .map((headerGroup) => (
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
                    {batchesInWarehouseTabel.getRowModel().rows.length > 0 ? (
                      batchesInWarehouseTabel.getRowModel().rows.map((row) => {
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
                      })
                    ) : (
                      <tr>
                        <td colSpan={batchesInWarehouse.length}>
                          {batchesInWarehouseContent}
                        </td>
                      </tr>
                    )}
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
      {med && (
        <EditMedicine
          open={openEdit}
          handleOpen={handleOpenEdit}
          medicineId={med.id}
          prePrice={med.price}
        />
      )}
    </>
  );
};

export default MedicineDetails;
