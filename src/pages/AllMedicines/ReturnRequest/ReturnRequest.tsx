import { FC, useCallback, useEffect, useRef, useState } from "react";
import { XSquareFill } from "react-bootstrap-icons";
import Button from "../../../components/Button/Button";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import Counter from "../../../components/Counter/Counter";
import { DropdownProvider } from "../../../components/Dropdown/context";
import Dropdown from "../../../components/Dropdown/Dropdown";
import DropdownMenu from "../../../components/Dropdown/DropdownMenu";
import DropdownItem from "../../../components/Dropdown/DropdownItem";
import { useOpenToggle } from "../../../hooks/useOpenToggle";
import {
  findMedicinesToReeturn,
  resetReturnMedicinesStatus,
  returnMedicines,
  selectReturnMedicinesError,
  selectReturnMedicinesStatus,
} from "../../../redux/medicineSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { usePagination } from "../../../hooks/usePagination";
import NoData from "../../NoData/NoData";
import Beat from "../../../components/Loading/Beat";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ResponseStatus } from "../../../enums/ResponseStatus";
import { toast } from "react-toastify";
import { BatchRequest } from "../../../Schema/Requests/Batch";
const NotFound = require("./../../../assets/medicines/not-found.png");

interface Props {
  open: boolean;
  handleOpen: () => void;
}

const ReturnRequest: FC<Props> = ({ open, handleOpen }) => {
  const { open: openChoose, handleOpen: handleChooseMedicines } =
    useOpenToggle();

  const [reason, setReason] = useState<string>("");

  const handleReason = (e: any) => {
    setReason(e.target.value);
  };
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectReturnMedicinesStatus);
  const error = useAppSelector(selectReturnMedicinesError);
  const [elements, setUiElements] = useState<Array<{ [key: string]: any }>>([]);
  const actionElement = (index: string) => {
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
  const medicineSelected = (index: string) => {
    return elements.hasOwnProperty(index);
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

  const endRef = useRef<any>(null);
  const [medicines, setMedicines] = useState<any>([]);
  let content = useRef<any>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { pageIndex, pageSize, handlePgination } = usePagination(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const handleSendRequest = () => {
    if (reason !== "") {
      let isValid = true;
      if (elements !== undefined) {
        const request: BatchRequest[] = Object.keys(elements).map(
          (key: any) => {
            const element = elements[key];
            if (element.batchId === null) isValid = false;
            return {
              batchId: element.batchId,
              quantity: element.quantity,
            };
          }
        );
        if (isValid) {
          dispatch(returnMedicines({ returnReason: reason, batches: request }));
        } else {
          toast.error("المعلومات المدخلة غير مكتملة");
        }
      } else {
        toast.error("المعلومات المدخلة غير مكتملة");
      }
    } else {
      toast.error("المعلومات المدخلة غير مكتملة");
    }
  };
  const onIntersection = useCallback(
    async (entries: any) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !isFetching) {
        setIsFetching(true);

        try {
          const response = await dispatch(
            findMedicinesToReeturn({
              limit: String(pageSize),
              page: String(pageIndex),
            })
          );

          if (response.payload && response.payload.data.length > 0) {
            setMedicines((prevMedicines: any) => [
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
    ]
  );
  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) {
      handleOpen();
      toast.success("تم إرسال الطلب بنجاح");
      dispatch(resetReturnMedicinesStatus());
    } else if (status === ResponseStatus.FAILED) {
      toast.error(error);
    }
  }, [status, error, handleOpen, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && endRef.current && openChoose) {
      observer.observe(endRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [onIntersection, openChoose]);
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
              <div className="flex flex-col gap-3 my-medium">
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
              </div>
              <div className="flex justify-center gap-small">
                <Button
                  text="إرسال"
                  variant="base-blue"
                  disabled={false}
                  size="lg"
                  onClick={handleSendRequest}
                  status={status}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {openChoose && (
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
              {medicines.length > 0
                ? medicines.map((medicien: any) => {
                    return (
                      <div key={`${medicien.id}${medicien.name}`}>
                        <MedicineCard
                          name={medicien.name}
                          photoAlt={medicien.name}
                          photoSrc={
                            medicien.imageUrl !== null
                              ? medicien.imageUrl
                              : NotFound
                          }
                          action={
                            medicineSelected(medicien.id) && (
                              <Counter
                                quantity={elements[medicien.id].quantity}
                                max={elements[medicien.id]?.max}
                                onChange={(newQuantity) =>
                                  handleQuantityChange(medicien.id, newQuantity)
                                }
                              />
                            )
                          }
                          inactive={
                            medicineSelected(medicien.id) ? false : true
                          }
                          className="cursor-pointer hover:bg-greyScale-lighter"
                          onClick={() => actionElement(medicien.id)}
                        />
                        {medicineSelected(medicien.id) && (
                          <div className="flex flex-col gap-medium">
                            <DropdownProvider title="اختيار الدفعة">
                              <Dropdown
                                error={
                                  medicineSelected(medicien.id) &&
                                  elements[medicien.id].batchId === null
                                }
                              >
                                <DropdownMenu>
                                  {medicien.batches.map((item: any) => (
                                    <DropdownItem
                                      key={`${item.expireDate}${item.id}`}
                                      title={item.id.toString()}
                                      subTitle={item.expireDate}
                                      handleSelectValue={() =>
                                        handleCaptureBatch(
                                          medicien.id,
                                          item.id,
                                          item.quantity
                                        )
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
                  })
                : content.current}
              {hasMore && <Beat ref={endRef} />}
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
