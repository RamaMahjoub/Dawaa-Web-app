/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import DropdownItem from "../../components/Dropdown/DropdownItem";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Dropdown from "../../components/Dropdown/Dropdown";
import { DropdownProvider } from "../../components/Dropdown/context";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Counter from "../../components/Counter/Counter";
import { XSquareFill } from "react-bootstrap-icons";
import { useOpenToggle } from "../../hooks/useOpenToggle";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getAllInventories,
  getMedicinesInInventory,
  selectTransferBetweenInventoriesError,
  selectTransferBetweenInventoriesStatus,
  selectallInventoriesData,
  selectallInventoriesStatus,
  transferBetweenInventories,
} from "../../redux/inventorySlice";
import NoData from "../NoData/NoData";
import Beat from "../../components/Loading/Beat";
import { ResponseStatus } from "../../enums/ResponseStatus";
import { usePagination } from "../../hooks/usePagination";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Data } from "../../Schema/Responses/Data";
import { Inventory } from "../../Schema/Responses/Inventory";
import { InventoryMedicine } from "../../Schema/Responses/InventoryMedicine";
import { Batch } from "../../Schema/Responses/Batch";
const NotFound = require("./../../assets/medicines/not-found.png");

interface Req {
  fromInventory: number | undefined;
  toInventory: number | undefined;
  batches: { batchId: number; quantity: number }[];
}
const TransferMedicines = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { open, handleOpen } = useOpenToggle();
  const [toInventory, setToInventory] = useState<any>();
  const [fromInventory, setFromInventory] = useState<any>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { pageIndex, pageSize, handlePgination } = usePagination(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [medicines, setMedicines] = useState<InventoryMedicine[]>([]);

  let content = useRef<any>(null);
  let endRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const invintories = useAppSelector<Data<Array<Inventory>>>(
    selectallInventoriesData
  );
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
  const status = useAppSelector(selectallInventoriesStatus);
  const sendStatus = useAppSelector(selectTransferBetweenInventoriesStatus);
  const sendError = useAppSelector(selectTransferBetweenInventoriesError);
  useEffect(() => {
    dispatch(getAllInventories({ name: undefined }));
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
    from = <div>حدث خطأ ما...</div>;
    to = <div>حدث خطأ ما...</div>;
  } else if (status === ResponseStatus.SUCCEEDED) {
    if (fromInventory?.length === 0) {
      from = <NoData />;
      to = <NoData />;
    } else {
      from = fromInventory?.map((inventory: Inventory) => (
        <DropdownItem
          key={uuidv4()}
          title={inventory.name}
          handleSelectValue={() => handleCaptureFromInventory(inventory.id)}
        />
      ));
      to = toInventory?.map((inventory: Inventory) => (
        <DropdownItem
          key={uuidv4()}
          title={inventory.name}
          handleSelectValue={() => handleCaptureToInventory(inventory.id)}
        />
      ));
    }
  }
  const [elements, setUiElements] = useState<Array<{ [key: string]: any }>>([]);

  const medicineSelected = (index: number) => {
    return elements.hasOwnProperty(index);
  };

  const actionElement = (index: number) => {
    if (!medicineSelected(index)) {
      setUiElements((prevElements) => ({
        ...prevElements,
        [index]: {
          batchId: null,
          quantity: 1,
          max: undefined,
        },
      }));
    } else {
      setUiElements((prevElements) => {
        const updatedElements: any = { ...prevElements };
        delete updatedElements[index];
        return updatedElements;
      });
    }
  };
  const handleCaptureBatch = (key: number, batchId: number, max: number) => {
    setUiElements((prevElements: any) => ({
      ...prevElements,
      [key]: {
        ...prevElements[key],
        batchId,
        max,
      },
    }));
  };
  if (sendStatus === ResponseStatus.SUCCEEDED) {
    toast.success("تم نقل الأدوية بنجاح");
  } else if (sendStatus === ResponseStatus.FAILED) {
    toast.error(sendError);
  }
  const handleQuantityChange = (key: number, newQuantity: number) => {
    setUiElements((prevElements: any) => ({
      ...prevElements,
      [key]: {
        ...prevElements[key],
        quantity: newQuantity,
      },
    }));
  };

  const handleSendRequest = () => {
    if (
      Object.keys(elements).length > 0 &&
      request.fromInventory !== undefined &&
      request.toInventory !== undefined
    ) {
      request.batches = Object.keys(elements).map((key: any) => {
        const element = elements[key];
        return {
          batchId: element.batchId,
          quantity: element.quantity,
        };
      });
      const req = {
        from: request.fromInventory,
        to: request.toInventory,
        batches: request.batches,
      };
      dispatch(transferBetweenInventories(req));
    }
  };

  const onIntersection = useCallback(
    async (entries: any) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting && hasMore && !isFetching) {
        setIsFetching(true);

        try {
          const response = await dispatch(
            getMedicinesInInventory({
              page: String(pageIndex),
              limit: String(pageSize),
              id: String(request.fromInventory),
            })
          );

          if (response.payload && response.payload.data.length > 0) {
            setMedicines((prevMedicines: InventoryMedicine[]) => [
              ...prevMedicines,
              ...response.payload.data,
            ]);
            handlePgination(pageIndex + 1);
          } else {
            setHasMore(false);
            if (medicines.length === 0) content.current = <NoData />;
          }
        } catch (error) {
          content.current = <div>حدث خطأ ما...</div>;
        } finally {
          setIsFetching(false);
        }
      }
    },
    [
      pageIndex,
      pageSize,
      hasMore,
      dispatch,
      medicines,
      isFetching,
      handlePgination,
      request.fromInventory,
    ]
  );
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && endRef.current && request.fromInventory && open) {
      observer.observe(endRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [onIntersection, request.fromInventory, open]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-greyScale-lighter">
      <div className="flex flex-col w-64 gap-1 bg-white py-large px-x-large sm:w-96 rounded-med m-medium">
        <p className="flex justify-center font-semibold text-greyScale-main text-large my-medium">
          {title}
        </p>
        <div className="flex flex-col gap-3 my-medium">
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
              type="submit"
              onClick={handleSendRequest}
              status={sendStatus}
            />
          </div>
        </div>
      </div>
      {open && request.fromInventory && (
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
              {medicines.length > 0 &&
                medicines.map((med: InventoryMedicine) => {
                  return (
                    <div key={med.id}>
                      <MedicineCard
                        name={med.name}
                        photoAlt={String(med.id)}
                        photoSrc={
                          med.imageUrl === null ? NotFound : med.imageUrl
                        }
                        action={
                          medicineSelected(med.id) &&
                          elements[med.id]?.max > 0 && (
                            <Counter
                              quantity={elements[med.id].quantity}
                              max={elements[med.id]?.max}
                              onChange={(newQuantity) =>
                                handleQuantityChange(med.id, newQuantity)
                              }
                            />
                          )
                        }
                        inactive={medicineSelected(med.id) ? false : true}
                        className="cursor-pointer hover:bg-greyScale-lighter"
                        onClick={() => actionElement(med.id)}
                      />
                      {medicineSelected(med.id) && (
                        <div className="flex flex-col gap-medium">
                          <DropdownProvider title="اختيار الدفعة">
                            <Dropdown
                              error={
                                medicineSelected(med.id) &&
                                elements[med.id].batchId === null
                              }
                            >
                              <DropdownMenu>
                                {med.batches.map((item: Batch) => {
                                  if (item.quantity > 0)
                                    return (
                                      <DropdownItem
                                        key={item.id}
                                        title={item.id.toString()}
                                        subTitle={item.expireDate}
                                        handleSelectValue={() =>
                                          handleCaptureBatch(
                                            med.id,
                                            item.id,
                                            item.quantity
                                          )
                                        }
                                      />
                                    );
                                })}
                              </DropdownMenu>
                            </Dropdown>
                          </DropdownProvider>
                        </div>
                      )}
                    </div>
                  );
                })}
              {hasMore && <Beat ref={endRef} />}
            </div>
            <div className="flex justify-center p-medium">
              <Button
                text="حفظ"
                variant="base-blue"
                disabled={false}
                size="lg"
                onClick={handleOpen}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferMedicines;
