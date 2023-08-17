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
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  acceptInventoryReport,
  findInventoriesReports,
  rejectInventoryReport,
  selectAcceptReportStatus,
  selectRejectReportStatus,
} from "../../redux/reportsSlice";
import Beat from "../../components/Loading/Beat";
import NoData from "../NoData/NoData";
import { usePagination } from "../../hooks/usePagination";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toast } from "react-toastify";
import { ResponseStatus } from "../../enums/ResponseStatus";
import Loading from "../../components/Loading/Clip";
const NotFound = require("./../../assets/medicines/not-found.png");

const ReportAMedicine = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { pageIndex, pageSize, handlePgination } = usePagination(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const endRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [reports, setReports] = useState<any>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const acceptStatus = useAppSelector(selectAcceptReportStatus);
  const rejectStatus = useAppSelector(selectRejectReportStatus);
  let content = useRef<any>(null);

  let acceptButtonContent: any, rejectButtonContent: any;
  if (acceptStatus === ResponseStatus.LOADING) {
    acceptButtonContent = <Loading />;
  } else if (acceptStatus === ResponseStatus.SUCCEEDED) {
    acceptButtonContent = "قبول الطلب";
  } else if (acceptStatus === ResponseStatus.FAILED) {
    acceptButtonContent = "قبول الطلب";
  } else if (acceptStatus === ResponseStatus.IDLE) {
    acceptButtonContent = "قبول الطلب";
  }
  if (rejectStatus === ResponseStatus.LOADING) {
    rejectButtonContent = <Loading />;
  } else if (rejectStatus === ResponseStatus.SUCCEEDED) {
    rejectButtonContent = "رفض الطلب";
  } else if (rejectStatus === ResponseStatus.FAILED) {
    rejectButtonContent = "رفض الطلب";
  } else if (rejectStatus === ResponseStatus.IDLE) {
    rejectButtonContent = "رفض الطلب";
  }
  useEffect(() => {
    if (acceptStatus === ResponseStatus.SUCCEEDED) {
      setReports([]);
      handlePgination(0);
      setIsFetching(false);
      setHasMore(true);
      toast.success("تم قبول طلب الإبلاغ بنجاح");
    }
    if (rejectStatus === ResponseStatus.SUCCEEDED) {
      setReports([]);
      handlePgination(0);
      setIsFetching(false);
      setHasMore(true);
      toast.success("تم رفض طلب الإبلاغ");
    }
  }, [acceptStatus, rejectStatus, handlePgination]);

  const fetchReports = useCallback(async () => {
    try {
      const response = await dispatch(
        findInventoriesReports({
          limit: String(pageSize),
          page: String(pageIndex),
        })
      );

      if (response.payload && response.payload.data.length > 0) {
        setReports((prevMedicines: any) => [
          ...prevMedicines,
          ...response.payload.data,
        ]);
        handlePgination(pageIndex + 1);
      } else {
        setHasMore(false);
        if (reports.length === 0) content.current = <NoData />;
      }
    } catch (error) {
      content.current = <div>error...</div>;
    } finally {
      setIsFetching(false);
    }
  }, [reports, pageIndex, pageSize, handlePgination, dispatch]);
  const onIntersection = useCallback(
    (entries: any) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !isFetching) {
        setIsFetching(true);

        fetchReports();
      }
    },
    [hasMore, isFetching, fetchReports]
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

  const handleAcceptReport = async (id: string) => {
    dispatch(acceptInventoryReport({ id }));
  };

  const handleRejectReport = async (id: string) => {
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
                <AccordionProvider key={report.id}>
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
                      <div className="flex justify-end gap-small">
                        <Button
                          text={acceptButtonContent}
                          variant="base-blue"
                          disabled={false}
                          size="lg"
                          onClick={() =>
                            handleAcceptReport(report.id.toString())
                          }
                        />
                        <Button
                          text={rejectButtonContent}
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
