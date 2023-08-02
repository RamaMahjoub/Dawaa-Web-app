import { useLocation, useParams } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import { findSupplier } from "../../Schema/response/Suppliers.schema";
import Button from "../../components/Button/Button";
import { medicines } from "../../Schema/response/medicine.schema";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Counter from "../../components/Counter/Counter";
import TextBadge, { BadgeStatus } from "../../components/Badge/TextBadge";
import Header, { HeaderTypes } from "../../components/Header/Header";
import { useMediaQuery } from "react-responsive";

const SendOrder = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { supplierId } = useParams();
  const supplier = findSupplier(supplierId!);
  return (
    <div className="h-screen flex flex-col">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <div
        className="flex-1 bg-greyScale-lighter overflow-auto scrollbar-thin gap-large flex p-large flex-col sm:flex-row"
        style={{ height: "calc(100% - 125px)" }}
      >
        <div className="sm:w-4/12 min-w-min">
          <div
            className={`p-large h-fit mb-small break-words bg-white
           hover:bg-greyScale-lighter cursor-pointer rounded-med flex flex-col gap-large`}
          >
            <table>
              <tbody className="flex flex-col gap-large">
                <tr>
                  <td className="text-greyScale-light text-medium w-24">
                    الجهة المستقبلة:
                  </td>
                  <td className="text-greyScale-main text-medium break-words">
                    {supplier.name}
                  </td>
                </tr>
                <tr>
                  <td className="text-greyScale-light text-medium w-24">
                    الجهة المرسلة:
                  </td>
                  <td className="text-greyScale-main text-medium break-words">
                    مستودع محجوب
                  </td>
                </tr>
                <tr>
                  <td className="text-greyScale-light text-medium w-24">
                    مكان التوصيل:
                  </td>
                  <td className="text-greyScale-main text-medium break-words">
                    {supplier.address}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {!isMobile && (
            <div className="flex gap-small">
              <Button
                text="إرسال الطلب"
                variant="base-blue"
                disabled={false}
                size="med"
                style={{ flex: "1" }}
              />
              <Button
                text="إلغاء الطلب"
                variant="secondary"
                disabled={false}
                size="med"
                style={{ flex: "1" }}
              />
            </div>
          )}
        </div>
        <div className="bg-white flex flex-col h-full sm:w-8/12 rounded-med p-large">
          <p className="h-10 text-x-large text-greyScale-main">العناصر</p>
          <div className="flex-1 overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter">
            {medicines.map((medicine) => (
              <MedicineCard
                key={medicine.medicineId}
                name={medicine.name}
                subtitle={`${medicine.sellingPrice} ل.س`}
                photoAlt={medicine.name}
                photoSrc={medicine.photo}
                action={<Counter />}
              />
            ))}
          </div>
          <div className="w-full pt-large  flex items-center justify-end">
            <TextBadge
              className="mx-medium"
              title={`125000 ل.س`}
              status={BadgeStatus.BASE}
            />
          </div>
        </div>
        {isMobile && (
          <div className="flex gap-small">
            <Button
              text="إرسال الطلب"
              variant="base-blue"
              disabled={false}
              size="med"
              style={{ flex: "1" }}
            />
            <Button
              text="إلغاء الطلب"
              variant="secondary"
              disabled={false}
              size="med"
              style={{ flex: "1" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SendOrder;
