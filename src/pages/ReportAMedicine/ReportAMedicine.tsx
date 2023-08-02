import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import { findMedicine } from "../../Schema/response/medicine.schema";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Header, { HeaderTypes } from "../../components/Header/Header";
import { data } from "../../Schema/response/storeReport";
import Accordion from "../../components/Accordion/Accordion";
import { findStore } from "../../Schema/response/Store.schema";
import { getMonth } from "../../utils/Month";
import AccordionContent from "../../components/Accordion/AccordionContent";
import AccordionTitle from "../../components/Accordion/AccordionTitle";
import { AccordionProvider } from "../../components/Accordion/context";

const ReportAMedicine = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);

  return (
    <div className="h-screen flex flex-col">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="flex-1 flex-col gap-large flex bg-greyScale-lighter overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter p-large ">
        {data.map((report) => {
          const store = findStore(report.storeId);
          const reportDate = `${getMonth(
            report.reportDate.getMonth() + 1
          )} ${report.reportDate.getFullYear()}، ${report.reportDate.getDate()} `;
          const medicine = findMedicine(report.medicineId);
          return (
            <AccordionProvider>
              <Accordion>
                {/* header */}
                <AccordionTitle>
                  <span className="flex flex-1 items-center justify-between">
                    <p className="text-x-large text-greyScale-main">
                      {store.name}
                    </p>
                    <p className="text-large text-greyScale-light">
                      {reportDate}
                    </p>
                  </span>
                </AccordionTitle>

                <AccordionContent>
                  {/* content */}
                  <div className="text-large text-greyScale-light flex flex-col gap-medium">
                    <MedicineCard
                      name={medicine.name}
                      photoAlt={medicine.name}
                      photoSrc={medicine.photo}
                      subtitle={`الدفعة: ${medicine.batchId}`}
                    />
                    {report.reason}
                  </div>
                  {/* action */}
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
        })}
      </div>
    </div>
  );
};

export default ReportAMedicine;
