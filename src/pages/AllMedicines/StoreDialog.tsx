import { FC, useState } from "react";
import { CurrencyDollar, PlusSquare, XSquareFill } from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import { DropdownProvider } from "../../components/Dropdown/context";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import DropdownItem from "../../components/Dropdown/DropdownItem";
import { rows } from "../../Schema/response/Store.schema";
import Counter from "../../components/Counter/Counter";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const StoreDialog: FC<Props> = ({ open, handleOpen }) => {
  const [showElements, setShowElements] = useState<any>([]);
  const handleButtonClick = () => {
    setShowElements((prevElements: any) => [
      ...prevElements,
      <span
        key={prevElements.length}
        className="flex flex-col gap-2 py-x-small"
      >
        <DropdownProvider title="المخزن">
          <Dropdown>
            <DropdownMenu>
              {rows.map((store) => (
                <DropdownItem key={store.id} title={store.name} />
              ))}
            </DropdownMenu>
          </Dropdown>
        </DropdownProvider>
        <Counter />
      </span>,
    ]);
  };
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] max-h-screen sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large   text-greyscale-main text-xx-large border-solid border-b border-greyScale-light flex justify-between items-center">
              تخزين دواء
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col gap-small px-x-large py-medium flex-1 overflow-auto scrollbar-thin ">
              <p className="text-greyScale-main">سعر المبيع:</p>
              <TextField
                startIcon={<CurrencyDollar className="pl-x-small border-l" />}
                inputSize="x-large"
              />
              <div className="flex justify-end">
                <PlusSquare
                  className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                  onClick={handleButtonClick}
                />
              </div>
              <div className="flex flex-col w-full divide-y">
                {showElements}
              </div>
            </div>
            <div className="p-medium flex justify-center">
              <Button
                text="تخزين"
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

export default StoreDialog;
