import { FC, useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import { XSquareFill } from "react-bootstrap-icons";
import { DropdownProvider } from "../../components/Dropdown/context";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropdownItem from "../../components/Dropdown/DropdownItem";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllPharmacies } from "../../redux/pharmacySlice";
import { usePagination } from "../../hooks/usePagination";
import NoData from "../NoData/NoData";
import Beat from "../../components/Loading/Beat";
import { useOpenToggle } from "../../hooks/useOpenToggle";
import {
  getAllSuppliers,
  selectAllSuppliersData,
  selectAllSuppliersStatus,
} from "../../redux/supplierSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ResponseStatus } from "../../enums/ResponseStatus";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const destinations = ["صيدلية", "مورد"];
const SendComplaint: FC<Props> = ({ open, handleOpen }) => {
  const { open: openDropdown, handleOpen: handleOpenDropdown } =
    useOpenToggle();
  const [dest, setDest] = useState<string>("صيدلية");
  const { pageIndex, pageSize, handlePgination } = usePagination(10);
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const suppliers = useAppSelector(selectAllSuppliersData);
  const suppliersStatus = useAppSelector(selectAllSuppliersStatus);
  const content = useRef<any>(null);
  const endRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [request, setRequest] = useState<{
    destination: number | undefined;
    reason: string | undefined;
  }>({ destination: undefined, reason: undefined });

  const fetchParmacies = useCallback(async () => {
    try {
      const response = await dispatch(
        getAllPharmacies({
          limit: String(pageSize),
          page: String(pageIndex),
        })
      );

      if (response.payload && response.payload.data.length > 0) {
        setData((prevMedicines: any) => [
          ...prevMedicines,
          ...response.payload.data,
        ]);
        handlePgination(pageIndex + 1);
      } else {
        setHasMore(false);
        if (data.length === 0) content.current = <NoData />;
      }
    } catch (error) {
      content.current = <div>حدث خطأ ما...</div>;
    } finally {
      setIsFetching(false);
    }
  }, [dispatch, pageIndex, pageSize, handlePgination, data.length]);
  const onIntersection = useCallback(
    async (entries: any) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !isFetching) {
        setIsFetching(true);

        await fetchParmacies();
      }
    },
    [hasMore, isFetching, fetchParmacies]
  );
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (endRef.current && openDropdown && dest === "صيدلية") {
      observer.observe(endRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [onIntersection, openDropdown, dest]);
  const handleFilter = async (filter: string) => {
    setDest(filter);
    handleOpenDropdown();
    if (filter === "صيدلية") {
      await fetchParmacies();
    } else {
      await dispatch(getAllSuppliers({}));
      console.log(suppliers);
    }
  };

  const handleCaptureDestination = (destId: number) => {
    setRequest((pre) => ({ ...pre, destination: destId }));
  };
  const handleChangeReason = (event: any) => {
    setRequest((pre) => ({ ...pre, reason: event.target.value }));
  };

  const handleSendRequest = () => {
    console.log("req", request);
  };
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] max-h-screen sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              إرسال شكوى
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col flex-1 overflow-auto gap-small px-x-large py-medium scrollbar-thin ">
              <div className="overflow-auto mid scrollbar-none">
                {destinations.map((destination) => (
                  <Button
                    key={destination}
                    variant={`${dest === destination ? "active-text" : "text"}`}
                    disabled={false}
                    text={destination}
                    size="med"
                    className="min-w-max"
                    onClick={() => handleFilter(destination)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-3 my-medium">
                {dest === "صيدلية" ? (
                  <div onClick={handleOpenDropdown}>
                    <DropdownProvider title="اختيار صيدلية">
                      <Dropdown>
                        <DropdownMenu>
                          {data.length > 0 &&
                            data.map((item: any) => (
                              <DropdownItem
                                key={item.id}
                                title={item.name}
                                handleSelectValue={() =>
                                  handleCaptureDestination(item.id)
                                }
                              />
                            ))}
                          {hasMore && <Beat ref={endRef} />}
                        </DropdownMenu>
                      </Dropdown>
                    </DropdownProvider>
                  </div>
                ) : (
                  dest === "مورد" && (
                    <div onClick={handleOpenDropdown}>
                      <DropdownProvider title="اختيار مورَد">
                        <Dropdown>
                          <DropdownMenu>
                            {suppliersStatus === ResponseStatus.SUCCEEDED &&
                              suppliers.data.length > 0 &&
                              suppliers.data.map((item: any) => (
                                <DropdownItem key={item.id} title={item.name} />
                              ))}
                          </DropdownMenu>
                        </Dropdown>
                      </DropdownProvider>
                    </div>
                  )
                )}
                <textarea
                  value={request.reason}
                  onChange={handleChangeReason}
                  rows={3}
                  placeholder="ملاحظات حول السبب..."
                  className="border outline-none resize-none px-x-large py-small border-greyScale-light text-greyScale-main rounded-small text-medium"
                />
              </div>
            </div>
            <div className="flex justify-center p-medium">
              <Button
                text="إرسال"
                variant="base-blue"
                disabled={false}
                size="lg"
                onClick={handleSendRequest}
                
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendComplaint;
