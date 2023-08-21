import { FC } from "react";
import { CurrencyDollar, XSquareFill } from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import { useMediaQuery } from "react-responsive";
import TextField from "../../components/TextField/TextField";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addPayment, selectAddPaymentStatus } from "../../redux/paymentSlice";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { AddPayment } from "../../Schema/Requests/AddPayment";
import { addPaymentValidationSchema } from "../../validations/addPayment.validation";

interface Props {
  open: boolean;
  handleOpen: () => void;
  userId?: string;
}
const AddInvoice: FC<Props> = ({ open, handleOpen, userId }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAddPaymentStatus);
  const initialValues: AddPayment = {
    amount: 1000,
  };

  const handleSendRequest = (values: AddPayment) => {
    const newAmount = values.amount;
    const request = { amount: Number(newAmount) };
    console.log(request);
    dispatch(addPayment({ id: userId!, body: request }));
  };
  const formik = useFormSubmit(
    initialValues,
    handleSendRequest,
    addPaymentValidationSchema
  );
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
            <form
              className="flex flex-col flex-1 gap-2 overflow-auto px-medium py-medium scrollbar-thin"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="amount"
                startIcon={<CurrencyDollar className="border-l pl-x-small" />}
                inputSize="x-large"
                value={formik.getFieldProps("amount").value}
                onChange={formik.getFieldProps("amount").onChange}
                onBlur={formik.getFieldProps("amount").onBlur}
                helperText={
                  formik.touched.amount && Boolean(formik.errors.amount)
                    ? String(formik.errors.amount)
                    : ""
                }
              />
              <div className="flex justify-end pt-small gap-small">
                <Button
                  text="إضافة"
                  variant="red"
                  disabled={false}
                  size={isMobile ? "med" : "lg"}
                  type="submit"
                  status={status}
                />
                <Button
                  text="إلغاء"
                  variant="base-blue"
                  disabled={false}
                  onClick={handleOpen}
                  size={isMobile ? "med" : "lg"}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInvoice;
