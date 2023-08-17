/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import DropdownItem from "../../components/Dropdown/DropdownItem";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Dropdown from "../../components/Dropdown/Dropdown";
import { DropdownProvider } from "../../components/Dropdown/context";
import { useEffect, useMemo, useState } from "react";
import { storesMedicinesData } from "../../Schema/response/medicineInStore.schema";
import { findMedicine } from "../../Schema/response/medicine.schema";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Counter from "../../components/Counter/Counter";
import { XSquareFill } from "react-bootstrap-icons";
import { useOpenToggle } from "../../hooks/useOpenToggle";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getAllStores,
  selectAllStoresData,
  selectAllStoresStatus,
} from "../../redux/storeSlice";
import NoData from "../NoData/NoData";
import Beat from "../../components/Loading/Beat";
import { ResponseStatus } from "../../enums/ResponseStatus";
const ids = [
  { id: 1, expireDate: "12-3-2001", max: 52 },
  { id: 2, expireDate: "12-3-2001", max: 51 },
  { id: 3, expireDate: "12-3-2001", max: 50 },
  { id: 4, expireDate: "12-3-2001", max: 15 },
  { id: 5, expireDate: "12-3-2001", max: 85 },
];
interface Req {
  fromInventory: number | undefined;
  toInventory: number | undefined;
  batches: { batchId: number | undefined; quantity: number }[];
}
const TransferMedicines = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { open, handleOpen } = useOpenToggle();
  const [toInventory, setToInventory] = useState<any>();
  const [fromInventory, setFromInventory] = useState<any>();

  const dispatch = useAppDispatch();
  const invintories = useAppSelector(selectAllStoresData);
  let request: Req = useMemo(
    () => ({
      fromInventory: undefined,
      toInventory: undefined,
      batches: [],
    }),
    []
  );

  const handleCaptureFromInventory = (id: number) => {
    request.fromInventory = id;
    let updated = toInventory.filter((inventory: any) => inventory.id !== id);

    setToInventory(updated);
  };

  const handleCaptureToInventory = (id: number) => {
    request.toInventory = id;
    let updated = fromInventory.filter((inventory: any) => inventory.id !== id);

    setFromInventory(updated);
  };
  const status = useAppSelector(selectAllStoresStatus);
  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);
  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) {
      setFromInventory(invintories.data);
      setToInventory(invintories.data);
    }
  }, [status, invintories]);
  let from, to;
  if (status === ResponseStatus.LOADING) {
    from = <Beat />;
    to = <Beat />;
  } else if (status === ResponseStatus.FAILED) {
    from = <div>error...</div>;
    to = <div>error...</div>;
  } else if (status === ResponseStatus.SUCCEEDED) {
    if (fromInventory?.length === 0) {
      from = <NoData />;
      to = <NoData />;
    } else {
      from = fromInventory?.map((inventory: any) => (
        <DropdownItem
          key={inventory.id}
          title={inventory.name}
          handleSelectValue={() => handleCaptureFromInventory(inventory.id)}
        />
      ));
      to = toInventory?.map((inventory: any) => (
        <DropdownItem
          key={inventory.id}
          title={inventory.name}
          handleSelectValue={() => handleCaptureToInventory(inventory.id)}
        />
      ));
    }
  }
  const [elements, setUiElements] = useState<any>([]);

  const medicineSelected = (index: number) => {
    return elements.some((element: any) => index === element.medicineId);
  };

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
    if (
      elements.length > 0 &&
      request.fromInventory !== undefined &&
      request.toInventory !== undefined
    ) {
      request.batches = elements.map((element: any) => {
        return {
          batchId: element.batchId,
          quantity: element.quantity,
        };
      });
      console.log(request);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-greyScale-lighter">
      <div className="flex flex-col w-64 gap-1 bg-white py-large px-x-large sm:w-96 rounded-med m-medium">
        <p className="flex justify-center font-semibold text-greyScale-main text-large my-medium">
          {title}
        </p>
        <form
          onSubmit={(e: any) => e.preventDefault()}
          className="flex flex-col gap-3 my-medium"
        >
          <DropdownProvider title="من المخزن">
            <Dropdown>
              <DropdownMenu>{from}</DropdownMenu>
            </Dropdown>
          </DropdownProvider>
          <DropdownProvider title="إلى المخزن">
            <Dropdown>
              <DropdownMenu>{to}</DropdownMenu>
            </Dropdown>
          </DropdownProvider>
          <Button
            variant="blue-outline"
            disabled={false}
            text="اختيار الأدوية"
            size="medium"
            onClick={handleOpen}
          />
          <div className="m-auto">
            <Button
              variant="base-blue"
              disabled={false}
              text="إرسال"
              size="lg"
              onClick={handleSendRequest}
            />
          </div>
        </form>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] h-[435px] flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              اختيار الأدوية لنقلها
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col flex-1 overflow-auto gap-small px-medium scrollbar-thin">
              {storesMedicinesData.map((med, index: number) => {
                const medicine = findMedicine(med.medicineId);
                return (
                  <div>
                    <MedicineCard
                      key={med.id}
                      name={medicine.name}
                      photoAlt={medicine.name}
                      photoSrc={medicine.photo}
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
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferMedicines;
