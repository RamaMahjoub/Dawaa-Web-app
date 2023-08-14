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
  { id: 1, expireDate: "12-3-2001", max: 52 },
  { id: 2, expireDate: "12-3-2001", max: 51 },
  { id: 3, expireDate: "12-3-2001", max: 50 },
  { id: 4, expireDate: "12-3-2001", max: 15 },
  { id: 5, expireDate: "12-3-2001", max: 85 },
];
const ReturnRequest: FC<Props> = ({ open, handleOpen }) => {
  const [chooseMedicines, setChooseMedicines] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const handleChooseMedicines = () => {
    setChooseMedicines((pre) => !pre);
  };

  const handleReason = (e: any) => {
    setReason(e.target.value);
  };

  const [elements, setUiElements] = useState<any>([]);
  const actionElement = (index: number) => {
    if (!medicineSelected(index))
      setUiElements((prevElements: any) => [
        ...prevElements,
        {
          medicineId: index,
          batchId: null,
          quantity: 1,
          max: undefined,
        },
      ]);
    else {
      const updatedItems = elements.filter((i: any) => i.medicineId !== index);
      setUiElements(updatedItems);
    }
  };
  const medicineSelected = (index: number) => {
    return elements.some((element: any) => index === element.medicineId);
  };

  const handleCaptureBatch = (index: number, batchId: number, max: number) => {
    setUiElements((prevElements: any) => {
      const updatedElements = [...prevElements];
      updatedElements[index].batchId = batchId;
      updatedElements[index].max = max;
      return updatedElements;
    });
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setUiElements((prevElements: any) => {
      const updatedElements = [...prevElements];
      updatedElements[index].quantity = newQuantity;

      return updatedElements;
    });
  };

  const handleSendRequest = () => {
    if (elements.length > 0 && reason !== "") {
      const request = elements.map((element: any) => {
        return {
          batchId: element.batchId,
          quantity: element.quantity,
        };
      });
      console.log({ returnReason: reason, batches: request });
    }
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
                onSubmit={(e: any) => {
                  e.preventDefault();
                  handleSendRequest();
                  handleOpen()
                }}
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
                  value={reason}
                  onChange={handleReason}
                  placeholder="ملاحظات حول السبب..."
                  className="border outline-none resize-none px-x-large py-small border-greyScale-light text-greyScale-main rounded-small text-medium"
                />
                <div className="flex justify-center gap-small">
                  <Button
                    text="إرسال"
                    variant="base-blue"
                    disabled={false}
                    size="lg"
                    type="submit"
                  />
                </div>
              </form>
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
                        medicineSelected(index) && (
                          <Counter
                            quantity={elements[index].quantity}
                            max={elements[index]?.max}
                            onChange={(newQuantity) =>
                              handleQuantityChange(index, newQuantity)
                            }
                          />
                        )
                      }
                      inactive={medicineSelected(index) ? false : true}
                      className="cursor-pointer hover:bg-greyScale-lighter"
                      onClick={() => actionElement(index)}
                    />
                    {medicineSelected(index) && (
                      <div className="flex flex-col gap-medium">
                        <DropdownProvider title="اختيار الدفعة">
                          <Dropdown>
                            <DropdownMenu>
                              {ids.map((item) => (
                                <DropdownItem
                                  key={item.id}
                                  title={item.id.toString()}
                                  subTitle={item.expireDate}
                                  handleSelectValue={() =>
                                    handleCaptureBatch(index, item.id, item.max)
                                  }
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
                onClick={handleChooseMedicines}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReturnRequest;
