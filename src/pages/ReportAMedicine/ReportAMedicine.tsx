import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Header, { HeaderTypes } from "../../components/Header/Header";
import Accordion from "../../components/Accordion/Accordion";
import { getMonth } from "../../utils/Month";
import AccordionContent from "../../components/Accordion/AccordionContent";
import AccordionTitle from "../../components/Accordion/AccordionTitle";
import { AccordionProvider } from "../../components/Accordion/context";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  acceptInventoryReport,
  findInventoriesReports,
  rejectInventoryReport,
  selectInventoriesReportsData,
  selectInventoriesReportsStatus,
} from "../../redux/reportsSlice";
import Beat from "../../components/Loading/Beat";
import NoData from "../NoData/NoData";
const NotFound = require("./../../assets/medicines/not-found.png");

const ReportAMedicine = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [{ pageIndex, pageSize }, setPageIndex] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1,
  });
  const [hasMore, setHasMore] = useState<boolean>(true);
  const endRef = useRef<any>(null);

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectInventoriesReportsData);
  const [reports, setReports] = useState<any>([]);
  const status = useAppSelector(selectInventoriesReportsStatus);
  let content = useRef<any>(null);
  const onIntersection = useCallback(
    (entries: any) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        dispatch(
          findInventoriesReports({
            limit: String(pageSize),
            page: String(pageIndex),
          })
        );
        if (status === "succeeded")
          if (data.data.length === 0) {
            setHasMore(false);
            if (reports.length === 0) content.current = <NoData />;
          } else {
            setReports((pre: any) => [...pre, ...data?.data]);
            setPageIndex((pre) => ({ ...pre, pageIndex: pre.pageIndex + 1 }));
          }
        else if (status === "loading") {
          content.current = <Beat />;
        } else if (status === "failed") {
          content.current = <div>error...</div>;
        }
      }
    },
    [pageIndex, pageSize, hasMore, dispatch, status, data, reports]
  );
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && endRef.current) {
      observer.observe(endRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [reports, onIntersection]);

  const handleAcceptReport = (id: string) => {
    dispatch(acceptInventoryReport({ id }));
  };

  const handleRejectReport = (id: string) => {
    dispatch(rejectInventoryReport({ id }));
  };
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="flex flex-col flex-1 overflow-auto gap-large bg-greyScale-lighter scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter p-large ">
        {reports.length > 0
          ? reports.map((report: any) => {
              const date = new Date(report.reportDate);
              const reportDate = `${getMonth(
                date.getMonth() + 1
              )} ${date.getFullYear()}، ${date.getDate()} `;
              return (
                <AccordionProvider>
                  <Accordion>
                    <AccordionTitle>
                      <span className="flex items-center justify-between flex-1">
                        <p className="text-x-large text-greyScale-main">
                          {report.inventoryName}
                        </p>
                        <p className="text-large text-greyScale-light">
                          {reportDate}
                        </p>
                      </span>
                    </AccordionTitle>

                    <AccordionContent>
                      <div className="flex flex-col text-large text-greyScale-light gap-medium">
                        <MedicineCard
                          name={report.medicineName}
                          photoAlt={report.medicineName}
                          photoSrc={NotFound}
                          subtitle={`الدفعة: ${report.batchId}`}
                        />
                        {report.reason}
                      </div>
                      <div className="flex justify-end">
                        <Button
                          text="قبول الطلب"
                          variant="base-blue"
                          disabled={false}
                          size="lg"
                          onClick={() =>
                            handleAcceptReport(report.id.toString())
                          }
                        />
                        <Button
                          text="رفض الطلب"
                          variant="red"
                          disabled={false}
                          size="lg"
                          onClick={() =>
                            handleRejectReport(report.id.toString())
                          }
                        />
                      </div>
                    </AccordionContent>
                  </Accordion>
                </AccordionProvider>
              );
            })
          : content.current}
        {hasMore && <Beat ref={endRef} />}
      </div>
    </div>
  );
};

export default ReportAMedicine;
