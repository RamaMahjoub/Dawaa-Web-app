import { CurrencyDollar, XSquareFill } from "react-bootstrap-icons";
import TextField from "../../../components/TextField/TextField";
import { FC } from "react";
import Button from "../../../components/Button/Button";
import { useMediaQuery } from "react-responsive";
interface Props {
  open: boolean;
  handleOpen: () => void;
}
const EditMedicine: FC<Props> = ({ open, handleOpen }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              تعديل
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex-col flex-1 gap-2 overflow-auto felx px-medium py-medium scrollbar-thin">
              <p className="text-greyScale-main">سعر المبيع:</p>
              <TextField
                startIcon={<CurrencyDollar className="border-l pl-x-small" />}
                inputSize="x-large"
              />
            </div>
            <div className="flex justify-end p-medium gap-small">
              <Button
                text="حفظ"
                variant="red"
                disabled={false}
                size={isMobile ? "med" : "lg"}
              />
              <Button
                text="إلغاء"
                variant="base-blue"
                disabled={false}
                size={isMobile ? "med" : "lg"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditMedicine;
