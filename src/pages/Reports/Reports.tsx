import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import { data, findReport } from "../../Schema/response/medicineReport.schema";
import { getMonth } from "../../utils/Month";
import { useCallback, useState } from "react";
import {
  MedicineSchema,
  findMedicine,
} from "../../Schema/response/medicine.schema";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Header, { HeaderTypes } from "../../components/Header/Header";
import DestinationCard from "../../components/DestinationCard/DestinationCard";

const Reports = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [selectedReport, setselectedReport] = useState<{
    index: number;
    reportId: string;
    medicine: MedicineSchema;
    reason: string;
  }>({
    index: 0,
    reportId: data[0].id,
    medicine: findMedicine(data[0].medicineId),
    reason: data[0].reason,
  });
  const handleSelectOrder = useCallback((index: number, reportId: string) => {
    const report = findReport(reportId);
    const medicine = findMedicine(report.medicineId);
    setselectedReport({ index, reportId, medicine, reason: report.reason });
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="flex-1 bg-greyScale-lighter sm:flex-row flex-col gap-large flex p-large overflow-auto scrollbar-thin">
        <div className="bg-white basis-auto shrink-0 sm:h-full sm:max-h-fit flex sm:flex-col gap-large p-medium overflow-auto scrollbar-thin sm:w-1/2 rounded-med">
          {data.map((report, index) => {
            const reportDate = `${getMonth(
              report.reportDate.getMonth() + 1
            )} ${report.reportDate.getFullYear()}، ${report.reportDate.getDate()} `;
            return (
              <div
                key={index}
                className="border-l pl-large sm:border-l-0 sm:pl-0 sm:border-b sm:pb-large"
              >
                <DestinationCard
                  title={report.from.name}
                  subTitle={report.from.address}
                  date={reportDate}
                  email={report.from.email}
                  phone={report.from.phone}
                  inactive={selectedReport?.index !== index}
                  handleActive={() => handleSelectOrder(index, report.id)}
                />
              </div>
            );
          })}
        </div>
        {selectedReport !== undefined && (
          <div className="bg-white flex-1 flex flex-col sm:h-full sm:w-1/2 rounded-med p-large">
            <p className="text-x-large text-greyScale-main">إبلاغ عن دواء</p>
            <div>
              <MedicineCard
                key={selectedReport.medicine.medicineId}
                name={selectedReport.medicine.name}
                subtitle={`الدفعة: ${selectedReport.medicine.batchId}`}
                photoAlt={selectedReport.medicine.name}
                photoSrc={selectedReport.medicine.photo}
              />
            </div>
            <div className="flex-1 h-4/6 flex flex-col gap-small border  border-greyScale-light rounded-med p-large">
              <p className="text-primary-main text-medium">السبب:</p>
              <p className="text-greyScale-dark text-large overflow-auto scrollbar-thin">
                {selectedReport.reason}
                {selectedReport.reason}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
