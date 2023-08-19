import { FC, useState } from "react";
import {
  Calendar2Event,
  CurrencyDollar,
  XSquareFill,
} from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import { useMediaQuery } from "react-responsive";
import TextField from "../../components/TextField/TextField";
import DatepickerHeader from "../../components/Header/DatepickerHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const AddInvoice: FC<Props> = ({ open, handleOpen }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [date, setDate] = useState(new Date());
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              إضافة دفعة
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col flex-1 gap-2 overflow-auto px-medium py-medium scrollbar-thin">
              {/* <form> */}
              <TextField
                startIcon={<CurrencyDollar className="border-l pl-x-small" />}
                inputSize="x-large"
              />
              <DatePicker
                renderCustomHeader={(props) => <DatepickerHeader {...props} />}
                selected={date}
                onChange={(date: Date) => setDate(date)}
                dateFormat="MMMM d, yyyy"
                customInput={
                  <TextField
                    startIcon={
                      <Calendar2Event className="border-l pl-x-small" />
                    }
                    inputSize="x-large"
                    variant="fill"
                  />
                }
              />
              <div className="flex justify-end pt-small gap-small">
                <Button
                  text="إضافة"
                  variant="red"
                  disabled={false}
                  size={isMobile ? "med" : "lg"}
                  type="submit"
                />
                <Button
                  text="إلغاء"
                  variant="base-blue"
                  disabled={false}
                  onClick={handleOpen}
                  size={isMobile ? "med" : "lg"}
                />
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInvoice;
