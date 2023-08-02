/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import { rows } from "../../Schema/response/Store.schema";
import DropdownItem from "../../components/Dropdown/DropdownItem";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Dropdown from "../../components/Dropdown/Dropdown";
import { DropdownProvider } from "../../components/Dropdown/context";
import { useState } from "react";
import { storesMedicinesData } from "../../Schema/response/medicineInStore.schema";
import { findMedicine } from "../../Schema/response/medicine.schema";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import Counter from "../../components/Counter/Counter";
import { XSquareFill } from "react-bootstrap-icons";

const TransferMedicines = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<string>>([]);
  const handleOpen = () => {
    setOpen((pre) => !pre);
  };
  const handleSelect = (medicineId: string) => {
    if (selected.includes(medicineId)) {
      const updatedItems = selected.filter((i) => i !== medicineId);
      setSelected(updatedItems);
    } else {
      const updatedItems = [...selected, medicineId];
      setSelected(updatedItems);
    }
  };
  return (
    <div className="w-full h-screen bg-greyScale-lighter flex items-center justify-center">
      <div className="bg-white py-large px-x-large flex flex-col gap-1 w-64 sm:w-96 rounded-med m-medium">
        <p className="flex justify-center text-greyScale-main text-large my-medium font-semibold">
          {title}
        </p>
        <form
          onSubmit={(e: any) => e.preventDefault()}
          className="flex flex-col gap-3 my-medium"
        >
          <DropdownProvider title="من المخزن">
            <Dropdown>
              <DropdownMenu>
                {rows.map((store) => (
                  <DropdownItem key={store.id} title={store.name} />
                ))}
              </DropdownMenu>
            </Dropdown>
          </DropdownProvider>
          <DropdownProvider title="إلى المخزن">
            <Dropdown>
              <DropdownMenu>
                {rows.map((store) => (
                  <DropdownItem key={store.id} title={store.name} />
                ))}
              </DropdownMenu>
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
            />
          </div>
        </form>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] h-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large flex items-center justify-between  text-greyscale-main text-xx-large border-solid border-b border-greyScale-light">
              اختيار الأدوية لنقلها
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col gap-small px-medium flex-1  overflow-auto scrollbar-thin">
              {storesMedicinesData.map((med) => {
                const medicine = findMedicine(med.medicineId);
                return (
                  <MedicineCard
                    key={med.id}
                    name={medicine.name}
                    photoAlt={medicine.name}
                    photoSrc={medicine.photo}
                    action={
                      selected.includes(med.id) && (
                        <Counter max={med.quantity} />
                      )
                    }
                    inactive={selected.includes(med.id) ? false : true}
                    className="cursor-pointer"
                    onClick={() => handleSelect(med.id)}
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
    </div>
  );
};

export default TransferMedicines;
