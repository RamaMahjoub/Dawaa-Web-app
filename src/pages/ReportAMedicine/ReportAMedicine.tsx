import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import { findMedicine } from "../../Schema/response/medicine.schema";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Header, { HeaderTypes } from "../../components/Header/Header";
import Accordion from "../../components/Accordion/Accordion";
import { findStore } from "../../Schema/response/Store.schema";
import { getMonth } from "../../utils/Month";
import AccordionContent from "../../components/Accordion/AccordionContent";
import AccordionTitle from "../../components/Accordion/AccordionTitle";
import { AccordionProvider } from "../../components/Accordion/context";
import { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  findInventoriesReports,
  selectInventoriesReportsData,
  selectInventoriesReportsStatus,
} from "../../redux/reportsSlice";
import { BeatLoader } from "react-spinners";

const ReportAMedicine = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [{ pageIndex, pageSize }, setPageIndex] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1,
  });
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectInventoriesReportsData);
  const status = useAppSelector(selectInventoriesReportsStatus);
  console.log(data);
  useEffect(() => {
    dispatch(
      findInventoriesReports({
        limit: String(pageSize),
        page: String(pageIndex),
      })
    );
  }, [dispatch, pageIndex, pageSize]);
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="flex flex-col flex-1 overflow-auto gap-large bg-greyScale-lighter scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter p-large ">
        {/* {data.map((report) => {
          const store = findStore(report.storeId);
          const reportDate = `${getMonth(
            report.reportDate.getMonth() + 1
          )} ${report.reportDate.getFullYear()}، ${report.reportDate.getDate()} `;
          const medicine = findMedicine(report.medicineId);
          return (
            <AccordionProvider>
              <Accordion>
                <AccordionTitle>
                  <span className="flex items-center justify-between flex-1">
                    <p className="text-x-large text-greyScale-main">
                      {store.name}
                    </p>
                    <p className="text-large text-greyScale-light">
                      {reportDate}
                    </p>
                  </span>
                </AccordionTitle>

                <AccordionContent>
                  <div className="flex flex-col text-large text-greyScale-light gap-medium">
                    <MedicineCard
                      name={medicine.name}
                      photoAlt={medicine.name}
                      photoSrc={medicine.photo}
                      subtitle={`الدفعة: ${medicine.batchId}`}
                    />
                    {report.reason}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      text="قبول الطلب"
                      variant="base-blue"
                      disabled={false}
                      size="lg"
                    />
                  </div>
                </AccordionContent>
              </Accordion>
            </AccordionProvider>
          );
        })} */}
        <BeatLoader
          color={"#94A3B8"}
          size={5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default ReportAMedicine;
