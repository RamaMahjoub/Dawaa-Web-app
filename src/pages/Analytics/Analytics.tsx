import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Header, { HeaderTypes } from "../../components/Header/Header";
import TextBadge, { BadgeStatus } from "../../components/Badge/TextBadge";
import Button from "../../components/Button/Button";
import { useState } from "react";
import TextField from "../../components/TextField/TextField";
import { Calendar2Event, CurrencyDollar } from "react-bootstrap-icons";
import DatepickerHeader from "../../components/Header/DatepickerHeader";
import DatePicker from "react-datepicker";

const schema: Array<{ name: string; orderId: string; amount: number }> = [
  {
    name: "صيدلية القاسم",
    orderId: "ID123120",
    amount: 160000,
  },
  {
    name: "صيدلية المنصور",
    orderId: "ID123121",
    amount: 230000,
  },
];
const Analytics = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const handleAddPayment = () => setAddPayment((pre) => !pre);
  return (
    <div className="h-screen flex flex-col">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="bg-greyScale-lighter p-large grid gap-large grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <span className="flex flex-col items-center justify-center gap-small  h-fit bg-white rounded-med p-large">
          <p className="text-greyScale-light text-medium">رأس المال المقبوض</p>
          <TextBadge title={`600000000 ل.س`} status={BadgeStatus.SUCCESS} />
        </span>
        <span className="flex flex-col items-center justify-center gap-small h-fit bg-white rounded-med p-large">
          <p className="text-greyScale-light text-medium">
            رأس المال غير المقبوض
          </p>
          <TextBadge title={`60000000 ل.س`} status={BadgeStatus.DANGER} />
        </span>
        <span className="flex flex-col items-center justify-center gap-small h-fit bg-white rounded-med p-large">
          <p className="text-greyScale-light text-medium">
            قيمة الأدوية المخزنة في المستودع
          </p>
          <TextBadge title={`600000000 ل.س`} status={BadgeStatus.WARNING} />
        </span>
        <span className="flex flex-col items-center justify-center gap-small h-fit bg-white rounded-med p-large">
          <p className="text-greyScale-light text-medium">
            المربح الصافي المقبوض
          </p>
          <TextBadge title={`600000000 ل.س`} status={BadgeStatus.SUCCESS} />
        </span>
        <span className="flex flex-col items-center justify-center gap-small h-fit bg-white rounded-med p-large">
          <p className="text-greyScale-light text-medium">
            المربح الصافي غير المقبوض
          </p>
          <TextBadge title={`600000000 ل.س`} status={BadgeStatus.DANGER} />
        </span>
      </div>
      <div className="flex-1 bg-greyScale-lighter sm:flex-row flex-col gap-large flex px-large pb-large overflow-auto scrollbar-thin">
        <div className="p-large min-w-max flex flex-1 flex-col gap-medium bg-white rounded-med overflow-auto scrollbar-none">
          <p className="text-greyScale-main">
            الطلبات الواردة غير مكتملة الدفع
          </p>
          <div className="overflow-auto scrollbar-none divide-y flex flex-col gap-medium">
            {schema.map((item) => {
              return (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>
                      <p className="text-medium text-greyScale-main">
                        {item.name}
                      </p>
                    </span>
                    <p className="text-medium text-red-main">- {item.amount}</p>
                  </div>
                  {addPayment && (
                    <div className="w-full flex flex-col gap-1 ">
                      <TextField
                        startIcon={
                          <CurrencyDollar className="pl-x-small border-l" />
                        }
                        inputSize="x-large"
                      />
                      <DatePicker
                        renderCustomHeader={(props) => (
                          <DatepickerHeader {...props} />
                        )}
                        selected={date}
                        onChange={(date: Date) => setDate(date)}
                        dateFormat="MMMM d, yyyy"
                        customInput={
                          <TextField
                            startIcon={
                              <Calendar2Event className="pl-x-small border-l" />
                            }
                            inputSize="x-large"
                            variant="fill"
                          />
                        }
                      />
                      <Button
                        variant="base-blue"
                        disabled={false}
                        text="إضافة"
                        size="xlg"
                        onClick={handleAddPayment}
                      />
                    </div>
                  )}
                  {!addPayment && (
                    <Button
                      variant="outlined"
                      disabled={false}
                      text="دفعة جديدة"
                      size="xlg"
                      onClick={handleAddPayment}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-large min-w-max flex flex-1 flex-col gap-medium bg-white rounded-med overflow-auto scrollbar-none">
          <p className="text-greyScale-main">
            الطلبات الصادرة غير مكتملة الدفع
          </p>
          <div className="overflow-auto scrollbar-none divide-y flex flex-col gap-medium">
            {schema.map((item) => {
              return (
                <div className="flex items-center justify-between">
                  <span>
                    <p className="text-medium text-greyScale-main">
                      {item.name}
                    </p>
                  </span>
                  <p className="text-medium text-red-main">- {item.amount}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
