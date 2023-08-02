import { FC, useState } from "react";
import { XSquareFill } from "react-bootstrap-icons";
import Button from "../../../components/Button/Button";
import { findOrder } from "../../../Schema/response/outgoingOrders.schema";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import Counter from "../../../components/Counter/Counter";

interface Props {
  open: boolean;
  handleOpen: () => void;
  orderId: string;
}
const ReturnRequest: FC<Props> = ({ open, handleOpen, orderId }) => {
  const order = findOrder(orderId!);
  const [chooseMedicines, setChooseMedicines] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<number>>([]);
  const handleSelect = (medicineId: number) => {
    if (selected.includes(medicineId)) {
      const updatedItems = selected.filter((i) => i !== medicineId);
      setSelected(updatedItems);
    } else {
      const updatedItems = [...selected, medicineId];
      setSelected(updatedItems);
    }
  };
  const handleChooseMedicines = () => {
    setChooseMedicines((pre) => !pre);
  };
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large   text-greyscale-main text-xx-large border-solid border-b border-greyScale-light flex justify-between items-center">
              طلب إرجاع
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleOpen}
              />
            </p>
            <div className="felx flex-col gap-2 px-medium py-medium flex-1 overflow-auto scrollbar-thin">
              <form
                onSubmit={(e: any) => e.preventDefault()}
                className="flex flex-col gap-3 my-medium"
              >
                <Button
                  variant="blue-outline"
                  disabled={false}
                  text="اختيار الأدوية"
                  size="medium"
                  onClick={handleChooseMedicines}
                />
                <textarea
                  rows={3}
                  placeholder="ملاحظات حول السبب..."
                  className="resize-none border px-x-large py-small border-greyScale-light text-greyScale-main rounded-small text-medium outline-none"
                />
              </form>
            </div>
            <div className="p-medium flex gap-small justify-center">
              <Button
                text="إرسال"
                variant="base-blue"
                disabled={false}
                size="lg"
              />
            </div>
          </div>
        </div>
      )}
      {chooseMedicines && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[435px] h-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large flex items-center justify-between  text-greyscale-main text-xx-large border-solid border-b border-greyScale-light">
              اختيار الأدوية
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleChooseMedicines}
              />
            </p>
            <div className="felx flex-col gap-2 px-medium flex-1 overflow-auto scrollbar-thin">
              {order.medicines.map((med, index) => {
                return (
                  <MedicineCard
                    key={index}
                    name={med.medicine.name}
                    photoAlt={med.medicine.name}
                    photoSrc={med.medicine.photo}
                    action={
                      selected.includes(index) && (
                        <Counter max={med.quantity} />
                      )
                    }
                    inactive={selected.includes(index) ? false : true}
                    className="cursor-pointer hover:bg-greyScale-lighter"
                    onClick={() => handleSelect(index)}
                  />
                );
              })}
            </div>
            <div className="p-medium flex justify-center">
              <Button text="حفظ" variant="base-blue" disabled={false} size="lg" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReturnRequest;
