import { useLocation, useParams } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Header, { HeaderTypes } from "../../components/Header/Header";
import { data } from "../../Schema/response/invoicesSchema";
import { getMonth } from "../../utils/Month";
import Button from "../../components/Button/Button";
import AddInvoice from "./AddInvoice";
import { useOpenToggle } from "../../hooks/useOpenToggle";
import { useState } from "react";

const filterList = [{ name: "دفعاتي" }, { name: "الدفعات المستلمة" }];

const Invoices = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { open, handleOpen } = useOpenToggle();
  const [filter, setFilter] = useState<string>(filterList[0].name);
  const { userId } = useParams();
  console.log(userId);
  const handleFilter = (filter: string) => {
    setFilter(filter);
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header title={title!} leftSpace={HeaderTypes.FREE} />
        <div className="overflow-auto mid scrollbar-none p-large">
          <div className="mid">
            {filterList.map((item: any) => (
              <Button
                variant={`${filter === item.name ? "active-text" : "text"}`}
                disabled={false}
                text={item.name}
                size="med"
                className="min-w-max"
                onClick={() => handleFilter(item.name)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-auto bg-greyScale-lighter sm:flex-row gap-large p-large scrollbar-thin">
          <div className="flex flex-col w-full h-full bg-white p-large max-h-fit rounded-small">
            <div className="flex items-center justify-between pb-large">
              <p className="text-x-large text-greyScale-main">صيدلية القاسم</p>
              {filter === filterList[1].name && (
                <Button
                  text="دفعة جديدة"
                  variant="base-blue"
                  disabled={false}
                  size={"lg"}
                  onClick={handleOpen}
                />
              )}
            </div>
            <div className="flex flex-col flex-1 h-full overflow-auto gap-large scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
              {data.map((invoice) => {
                return (
                  <>
                    {invoice.bills.map((bill) => {
                      const invoiceDate = `${getMonth(
                        bill.payDate.getMonth() + 1
                      )} ${bill.payDate.getFullYear()}، ${bill.payDate.getDate()} `;
                      return (
                        <span className="flex items-center justify-between border py-small px-medium rounded-med">
                          <p>{`${bill.payment} ل.س`}</p>
                          <p>{invoiceDate}</p>
                        </span>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <AddInvoice open={open} handleOpen={handleOpen} />
    </>
  );
};

export default Invoices;
