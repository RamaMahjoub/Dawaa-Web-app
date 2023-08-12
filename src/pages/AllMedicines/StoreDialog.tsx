import { FC, useEffect, useState } from "react";
import { PlusSquare, XSquareFill } from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import { DropdownProvider } from "../../components/Dropdown/context";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import DropdownItem from "../../components/Dropdown/DropdownItem";
import Counter from "../../components/Counter/Counter";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getAllStores,
  selectAllStoresData,
  selectAllStoresStatus,
} from "../../redux/storeSlice";
import { SubRequest } from "../../Schema/request/storeInInventory";
import { storeInInventory } from "../../redux/medicineSlice";
import { BeatLoader } from "react-spinners";

interface Props {
  open: boolean;
  handleOpen: () => void;
  medicine: any;
}

const StoreDialog: FC<Props> = ({ open, handleOpen, medicine }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllStoresData);
  let content: any;
  const status = useAppSelector(selectAllStoresStatus);
  const [elements, setUiElements] = useState<SubRequest[]>([]);
  console.log(elements);
  const addUiElement = () => {
    setUiElements((prevElements: any) => [
      ...prevElements,
      {
        inventoryId: null,
        batchId: null,
        quantity: 1,
        max: undefined,
      },
    ]);
  };
  const handleCaptureInventory = (index: number, inventoryId: number) => {
    setUiElements((prevElements: any) => {
      const updatedElements = [...prevElements];
      updatedElements[index].inventoryId = inventoryId;
      return updatedElements;
    });
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
  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);
  if (status === "loading") {
    content = (
      <BeatLoader
        color={"#94A3B8"}
        size={5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  } else if (status === "succeeded") {
    content =
      data.data.length > 0
        ? data.data.map((store: any, index: number) => (
            <DropdownItem
              key={store.id}
              title={store.name}
              handleSelectValue={() => handleCaptureInventory(index, store.id)}
            />
          ))
        : "لا يوجد عناصر";
  } else if (status === "idle") {
    content = "لا يوجد عناصر";
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] max-h-screen sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              تخزين دواء
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col flex-1 overflow-auto gap-small px-x-large py-medium scrollbar-thin ">
              <div className="flex justify-end">
                <PlusSquare
                  className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                  onClick={addUiElement}
                />
              </div>
              <div className="flex flex-col w-full divide-y">
                {elements.map((element: any, index: number) => (
                  <span key={index} className="flex flex-col gap-2 py-x-small">
                    <DropdownProvider title="المخزن">
                      <Dropdown>
                        <DropdownMenu>{content}</DropdownMenu>
                      </Dropdown>
                    </DropdownProvider>
                    <DropdownProvider title="اختيار الدفعة">
                      <Dropdown>
                        <DropdownMenu>
                          {medicine.batches.map((batch: any) => (
                            <DropdownItem
                              key={batch.id}
                              title={batch.id}
                              handleSelectValue={() =>
                                handleCaptureBatch(
                                  index,
                                  batch.id,
                                  batch.quantity
                                )
                              }
                            />
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </DropdownProvider>
                    <Counter
                      quantity={element.quantity}
                      onChange={(newQuantity) =>
                        handleQuantityChange(index, newQuantity)
                      }
                      max={element?.max}
                    />
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center p-medium">
              <Button
                text="تخزين"
                variant="base-blue"
                disabled={false}
                size="lg"
                onClick={() => dispatch(storeInInventory(elements))}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoreDialog;
