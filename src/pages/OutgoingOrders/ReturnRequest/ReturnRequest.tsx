import { FC, useState } from "react";
import { XSquareFill } from "react-bootstrap-icons";
import Button from "../../../components/Button/Button";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import Counter from "../../../components/Counter/Counter";
import { medicines } from "../../../Schema/response/medicine.schema";
import { DropdownProvider } from "../../../components/Dropdown/context";
import Dropdown from "../../../components/Dropdown/Dropdown";
import DropdownMenu from "../../../components/Dropdown/DropdownMenu";
import DropdownItem from "../../../components/Dropdown/DropdownItem";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const ids = [
  { id: "ID1", expireDate: "12-3-2001" },
  { id: "ID2", expireDate: "12-3-2001" },
  { id: "ID3", expireDate: "12-3-2001" },
  { id: "ID4", expireDate: "12-3-2001" },
  { id: "ID5", expireDate: "12-3-2001" },
];
const ReturnRequest: FC<Props> = ({ open, handleOpen }) => {
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
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              طلب إرجاع
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex-col flex-1 gap-2 overflow-auto felx px-medium py-medium scrollbar-thin">
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
                  className="border outline-none resize-none px-x-large py-small border-greyScale-light text-greyScale-main rounded-small text-medium"
                />
              </form>
            </div>
            <div className="flex justify-center p-medium gap-small">
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
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              اختيار الأدوية
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleChooseMedicines}
              />
            </p>
            <div className="flex-col flex-1 gap-2 overflow-auto felx px-medium scrollbar-thin">
              {medicines.map((med, index) => {
                return (
                  <div>
                    <MedicineCard
                      key={index}
                      name={med.name}
                      photoAlt={med.name}
                      photoSrc={med.photo}
                      action={
                        Number(med.medicineId) - 1  === 0 && (
                          <Counter quantity={1} max={51} />
                        )
                      }
                      inactive={selected.includes(index) ? false : true}
                      className="cursor-pointer hover:bg-greyScale-lighter"
                      onClick={() => handleSelect(index)}
                    />
                    {selected.includes(Number(med.medicineId) - 1) && (
                      <div className="flex flex-col gap-medium">
                        <DropdownProvider title="اختيار الدفعة">
                          <Dropdown>
                            <DropdownMenu>
                              {ids.map((item) => (
                                <DropdownItem
                                  key={item.id}
                                  title={item.id}
                                  subTitle={item.expireDate}
                                />
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        </DropdownProvider>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center p-medium">
              <Button
                text="حفظ"
                variant="base-blue"
                disabled={false}
                size="lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReturnRequest;
