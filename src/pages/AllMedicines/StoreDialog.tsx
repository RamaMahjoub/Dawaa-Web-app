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
import Beat from "../../components/Loading/Beat";
import NoData from "../NoData/NoData";
import { v4 as uuidv4 } from "uuid";
import { storeInInventory } from "../../redux/medicineSlice";
import { ResponseStatus } from "../../enums/ResponseStatus";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  handleOpen: () => void;
  medicine: any;
}

const StoreDialog: FC<Props> = ({ open, handleOpen, medicine }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllStoresData);
  const [loading, setLoading] = useState<string>(ResponseStatus.IDLE);
  let content: any;
  const status = useAppSelector(selectAllStoresStatus);
  const [elements, setUiElements] = useState<Array<{ [key: string]: any }>>([]);
  const addUiElement = () => {
    const isValid =
      Object.keys(elements).length > 0
        ? Object.keys(elements).every((key: any) => {
            const element = elements[key];
            if (element.batchId === null || element.inventoryId === null)
              return false;
            return true;
          })
        : true;
    if (isValid) {
      const uniqueKey = uuidv4();
      setUiElements((prevElements) => ({
        ...prevElements,
        [uniqueKey]: {
          inventoryId: null,
          batchId: null,
          quantity: 1,
          max: undefined,
        },
      }));
    } else {
      toast.error("المعلومات المدخلة غير مكتملة");
    }
  };

  const handleCaptureInventory = (key: string, inventoryId: number) => {
    setUiElements((prevElements: any) => ({
      ...prevElements,
      [key]: {
        ...prevElements[key],
        inventoryId,
      },
    }));
  };
  const handleCaptureBatch = (key: string, batchId: number, max: number) => {
    setUiElements((prevElements: any) => ({
      ...prevElements,
      [key]: {
        ...prevElements[key],
        batchId,
        max,
      },
    }));
  };

  const handleQuantityChange = (key: string, newQuantity: number) => {
    setUiElements((prevElements: any) => ({
      ...prevElements,
      [key]: {
        ...prevElements[key],
        quantity: newQuantity,
      },
    }));
  };
  useEffect(() => {
    dispatch(getAllStores({ name: undefined }));
  }, [dispatch]);

  if (status === ResponseStatus.LOADING) {
    content = <Beat />;
  } else if (status === ResponseStatus.SUCCEEDED) {
    content = <NoData />;
  } else if (status === ResponseStatus.FAILED) {
    content = <div>حدث خطأ ما...</div>;
  }

  const handleSendRequest = () => {
    const requests = Object.keys(elements).map((key: any) => {
      const isValid =
        Object.keys(elements).length > 0
          ? Object.keys(elements).every((key: any) => {
              const element = elements[key];
              if (element.batchId === null || element.inventoryId === null)
                return false;
              return true;
            })
          : true;
      if (isValid) {
        const body = {
          batch: {
            batchId: elements[key].batchId,
            quantity: elements[key].quantity,
          },
        };
        return dispatch(
          storeInInventory({ id: elements[key].inventoryId, body })
        )
          .then((response) => ({ success: true, response }))
          .catch((error) => ({ success: false, error }));
      } else {
        toast.error("المعلومات المدخلة غير مكتملة");
      }
    });

    if (requests.length > 0) {
      setLoading(ResponseStatus.LOADING);
      Promise.all(requests)
        .then((results) => {
          const allSucceeded = results.every((result) => result?.success);
          if (allSucceeded) {
            toast.success("تم تخزين الأدوية بنجاح");
            handleOpen();
          } else {
            toast.error("حدث خطا ما...");
          }
        })
        .catch(() => toast.error("حدث خطا ما..."))
        .finally(() => setLoading(ResponseStatus.IDLE));
    }
  };
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
                {Object.keys(elements).map((key: any) => {
                  const element = elements[key];
                  return (
                    <span
                      key={`${key}${key}`}
                      className="flex flex-col gap-2 py-x-small"
                    >
                      <DropdownProvider title="المخزن">
                        <Dropdown error={element.inventoryId === null}>
                          <DropdownMenu>
                            {status === "succeeded" && data.data.length > 0
                              ? data.data.map((store: any) => (
                                  <DropdownItem
                                    key={`${store.id}${key}`}
                                    title={store.name}
                                    handleSelectValue={() =>
                                      handleCaptureInventory(key, store.id)
                                    }
                                  />
                                ))
                              : content}
                          </DropdownMenu>
                        </Dropdown>
                      </DropdownProvider>
                      <DropdownProvider title="اختيار الدفعة">
                        <Dropdown error={element.batchId === null}>
                          <DropdownMenu>
                            {medicine.batches.map((batch: any) => (
                              <DropdownItem
                                key={key}
                                title={batch.id}
                                handleSelectValue={() =>
                                  handleCaptureBatch(
                                    key,
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
                          handleQuantityChange(key, newQuantity)
                        }
                        max={element?.max}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center p-medium">
              <Button
                text="تخزين"
                variant="base-blue"
                disabled={false}
                size="lg"
                onClick={handleSendRequest}
                status={loading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoreDialog;
