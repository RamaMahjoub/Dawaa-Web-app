import { FC, useState } from "react";
import Button from "../../components/Button/Button";
import { XSquareFill } from "react-bootstrap-icons";
import { DropdownProvider } from "../../components/Dropdown/context";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropdownItem from "../../components/Dropdown/DropdownItem";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { suppliers } from "../../Schema/response/Suppliers.schema";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const destinations = ["صيدلية", "مورّد"];
const SendComplaint: FC<Props> = ({ open, handleOpen }) => {
  const [dest, setDest] = useState<string>("صيدلية");
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] max-h-screen sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large   text-greyscale-main text-xx-large border-solid border-b border-greyScale-light flex justify-between items-center">
              إرسال شكوى
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col gap-small px-x-large py-medium flex-1 overflow-auto scrollbar-thin ">
              <div className="mid overflow-auto scrollbar-none">
                {destinations.map((destination) => (
                  <Button
                    key={destination}
                    variant={`${dest === destination ? "active-text" : "text"}`}
                    disabled={false}
                    text={destination}
                    size="med"
                    className="min-w-max"
                    onClick={() => setDest(destination)}
                  />
                ))}
              </div>
              <form
                onSubmit={(e: any) => e.preventDefault()}
                className="flex flex-col gap-3 my-medium"
              >
                <DropdownProvider
                  title={
                    dest === destinations[0]
                      ? "تحديد الصيدلية"
                      : "تحديد المورّد"
                  }
                >
                  <Dropdown>
                    <DropdownMenu>
                      {suppliers.map((supplier) => (
                        <DropdownItem key={supplier.id} title={supplier.name} />
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </DropdownProvider>
                <textarea
                  rows={3}
                  placeholder="ملاحظات حول السبب..."
                  className="resize-none border px-x-large py-small border-greyScale-light text-greyScale-main rounded-small text-medium outline-none"
                />
              </form>
            </div>
            <div className="p-medium flex justify-center">
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
    </>
  );
};

export default SendComplaint;
