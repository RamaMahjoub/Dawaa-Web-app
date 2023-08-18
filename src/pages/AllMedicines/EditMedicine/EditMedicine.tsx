import { CurrencyDollar, XSquareFill } from "react-bootstrap-icons";
import TextField from "../../../components/TextField/TextField";
import { FC, useEffect } from "react";
import Button from "../../../components/Button/Button";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  editMedicine,
  selectEditMedicineStatus,
} from "../../../redux/medicineSlice";
import Loading from "./../../../components/Loading/Clip";
import { EditMedicineSchema } from "../../../Schema/request/editMedicine.schema";
import { useFormSubmit } from "../../../hooks/useFormSubmit";
import { editMedicineValidationSchema } from "../../../validations/editMedicine.validation";
import { ResponseStatus } from "../../../enums/ResponseStatus";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  handleOpen: () => void;
  medicineId: number;
  prePrice: number;
}
const EditMedicine: FC<Props> = ({
  open,
  handleOpen,
  medicineId,
  prePrice,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectEditMedicineStatus);
  let buttonContent;
  if (status === ResponseStatus.LOADING) {
    buttonContent = <Loading />;
  } else if (status === ResponseStatus.SUCCEEDED) {
    buttonContent = "حفظ";
    toast.success("تم تعديل سعر الدواء بنجاح");
  } else if (status === ResponseStatus.IDLE) {
    buttonContent = "حفظ";
  } else if (status === ResponseStatus.FAILED) {
    buttonContent = "حفظ";
  }

  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) handleOpen();
  }, [status, handleOpen]);

  const initialValues: EditMedicineSchema = {
    price: prePrice,
  };

  const handleSubmit = (values: EditMedicineSchema) => {
    const newPrice = values.price;
    const request = { price: Number(newPrice) };
    console.log(request);

    dispatch(editMedicine({ id: medicineId.toString(), body: request }));
  };

  const formik = useFormSubmit(
    initialValues,
    handleSubmit,
    editMedicineValidationSchema
  );
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
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  id="price"
                  startIcon={<CurrencyDollar className="border-l pl-x-small" />}
                  inputSize="x-large"
                  value={formik.getFieldProps("price").value}
                  onChange={formik.getFieldProps("price").onChange}
                  onBlur={formik.getFieldProps("price").onBlur}
                  helperText={
                    formik.touched.price && Boolean(formik.errors.price)
                      ? String(formik.errors.price)
                      : ""
                  }
                />
                <div className="flex justify-end pt-small gap-small">
                  <Button
                    text={buttonContent}
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
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditMedicine;
