import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Header, { HeaderTypes } from "../../components/Header/Header";
import TextBadge, { BadgeStatus } from "../../components/Badge/TextBadge";
import Button from "../../components/Button/Button";

const schema: Array<{
  pahrmacy: string;
  total: number;
  paid: number;
  dept: number;
}> = [
  {
    pahrmacy: "صيدلية القاسم",
    total: -1000,
    paid: 2000,
    dept: 3000,
  },
  {
    pahrmacy: "صيدلية المنصور",
    total: -1000,
    paid: 2000,
    dept: 3000,
  },
  {
    pahrmacy: "صيدلية القاسم",
    total: -1000,
    paid: 2000,
    dept: 3000,
  },
];
const Analytics = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div className="flex flex-col flex-1 overflow-auto gap-large scrollbar-thin px-xx-large py-large bg-greyScale-lighter">
        <div className="grid grid-cols-2 gap-large md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              رأس المال المقبوض
            </p>
            <TextBadge title={`600000000 ل.س`} status={BadgeStatus.SUCCESS} />
          </span>
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              رأس المال غير المقبوض
            </p>
            <TextBadge title={`60000000 ل.س`} status={BadgeStatus.DANGER} />
          </span>
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              قيمة الأدوية المخزنة في المستودع
            </p>
            <TextBadge title={`600000000 ل.س`} status={BadgeStatus.WARNING} />
          </span>
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              المربح الصافي المقبوض
            </p>
            <TextBadge title={`600000000 ل.س`} status={BadgeStatus.SUCCESS} />
          </span>
          <span className="flex flex-col items-center justify-center bg-white gap-small h-fit rounded-med p-large">
            <p className="text-greyScale-light text-medium">
              المربح الصافي غير المقبوض
            </p>
            <TextBadge title={`600000000 ل.س`} status={BadgeStatus.DANGER} />
          </span>
        </div>
        {/* <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter gap-large px-xx-large pb-large > */}
        <div className="flex-1 bg-white p-large rounded-med">
          <p className="text-greyScale-main">
            الحسابات غير المكتملة مع المورّدين
          </p>
          <div className="flex flex-col overflow-auto divide-y max-h-80 scrollbar-none gap-medium">
            {schema.map((item, index: number) => {
              return (
                <div className="w-full bg-white p-large rounded-small">
                  <div className="flex items-center justify-between pb-small">
                    <span className="flex text-x-large text-greyScale-main">
                      <p>{index < 10 ? `0${index}` : index}</p>
                      <p className="px-medium">{item.pahrmacy}</p>
                    </span>
                    <Button
                      variant="text"
                      disabled={false}
                      text="عرض التفاصيل"
                      size="med"
                      // onClick={handleNavigate}
                    />
                  </div>
                  <div className="justify-between leading-loose bg-greyScale-lighter h-fit rounded-small p-large sm:flex">
                    <span className="flex flex-col items-center grow">
                      <p className="text-small text-greyScale-light">
                        المبلغ الكلي
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.dept)}
                          status={BadgeStatus.DONE}
                        />
                      </p>
                    </span>
                    <span className="flex flex-col items-center grow border-y sm:border-x sm:border-y-0 border-greyScale-light">
                      <p className="text-small text-greyScale-light">
                        المبلغ المدفوع
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.paid)}
                          status={BadgeStatus.SUCCESS}
                        />
                      </p>
                    </span>
                    <span className="flex flex-col items-center grow">
                      <p className="text-small text-greyScale-light">
                        المبلغ المتبقي
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.total)}
                          status={BadgeStatus.DANGER}
                        />
                      </p>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white p-large rounded-med mt-large">
          <p className="text-greyScale-main">
            الحسابات غير المكتملة مع الصيدليات
          </p>
          <div className="flex flex-col overflow-auto divide-y max-h-80 scrollbar-none gap-medium">
            {schema.map((item, index: number) => {
              return (
                <div className="w-full bg-white p-large rounded-small">
                  <div className="flex items-center justify-between pb-small">
                    <span className="flex text-x-large text-greyScale-main">
                      <p>{index < 10 ? `0${index}` : index}</p>
                      <p className="px-medium">{item.pahrmacy}</p>
                    </span>
                    <Button
                      variant="secondary-light"
                      disabled={false}
                      text="عرض التفاصيل"
                      size="med"
                      // onClick={handleNavigate}
                    />
                  </div>
                  <div className="justify-between leading-loose bg-greyScale-lighter h-fit rounded-small p-large sm:flex">
                    <span className="flex flex-col items-center grow">
                      <p className="text-small text-greyScale-light">
                        المبلغ الكلي
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.dept)}
                          status={BadgeStatus.DONE}
                        />
                      </p>
                    </span>
                    <span className="flex flex-col items-center grow border-y sm:border-x sm:border-y-0 border-greyScale-light">
                      <p className="text-small text-greyScale-light">
                        المبلغ المدفوع
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.paid)}
                          status={BadgeStatus.SUCCESS}
                        />
                      </p>
                    </span>
                    <span className="flex flex-col items-center grow">
                      <p className="text-small text-greyScale-light">
                        المبلغ المتبقي
                      </p>
                      <p className="text-medium text-greyScale-main">
                        <TextBadge
                          title={String(item.total)}
                          status={BadgeStatus.DANGER}
                        />
                      </p>
                    </span>
                  </div>
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
