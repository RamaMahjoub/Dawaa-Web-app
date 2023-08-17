import { FC, useState } from "react";
import Button from "../../../components/Button/Button";
import TextField from "../../../components/TextField/TextField";
import {
  Envelope,
  EyeFill,
  EyeSlashFill,
  XSquareFill,
  Lock,
  GeoAltFill,
  ShopWindow,
  Telephone,
  Person,
} from "react-bootstrap-icons";
import { useFormSubmit } from "../../../hooks/useFormSubmit";
import { RegisterStoreSchema } from "../../../Schema/request/registerStore.schema";
import { registerStoreValidationSchema } from "../../../validations/registerStore.validation";
import { registerStore, selectAddStoreStatus } from "../../../redux/storeSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Loading from "../../../components/Loading/Clip";
import { toast } from "react-toastify";
import { ResponseStatus } from "../../../enums/ResponseStatus";

interface Props {
  open: boolean;
  handleOpen: () => void;
}

const AddStore: FC<Props> = ({ open, handleOpen }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAddStoreStatus);
  const [showPass, setShowPass] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPass((pre) => !pre);
  };
  const initialValues: RegisterStoreSchema = {
    fullName: "",
    email: "",
    password: "",
    name: "",
    location: "",
    inventoryPhoneNumber: "",
  };
  const handleSubmit = (values: RegisterStoreSchema) => {
    dispatch(registerStore(values));
  };
  const formik = useFormSubmit(
    initialValues,
    handleSubmit,
    registerStoreValidationSchema
  );
  let buttonContent;
  if (status === ResponseStatus.LOADING) {
    buttonContent = <Loading />;
  } else if (status === ResponseStatus.SUCCEEDED) {
    toast.success("تم تسجيل الحساب بنجاح");
    buttonContent = "حفظ";
  } else if (status === ResponseStatus.IDLE) {
    buttonContent = "حفظ";
  } else if (status === ResponseStatus.FAILED) {
    buttonContent = "حفظ";
  }
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[435px] flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              مخزن جديد
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col flex-1 overflow-auto gap-small px-medium py-medium scrollbar-thin">
              <form
                className="flex flex-col gap-3"
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  id="email"
                  startIcon={<Envelope />}
                  label="ايميل"
                  inputSize="x-large"
                  value={formik.getFieldProps("email").value}
                  onChange={formik.getFieldProps("email").onChange}
                  onBlur={formik.getFieldProps("email").onBlur}
                  helperText={
                    formik.touched.email && Boolean(formik.errors.email)
                      ? String(formik.errors.email)
                      : ""
                  }
                />
                <TextField
                  id="password"
                  startIcon={<Lock />}
                  endIcon={
                    showPass ? (
                      <EyeSlashFill onClick={handleShowPassword} />
                    ) : (
                      <EyeFill onClick={handleShowPassword} />
                    )
                  }
                  label="كلمة المرور"
                  type={showPass ? "text" : "password"}
                  inputSize="x-large"
                  value={formik.getFieldProps("password").value}
                  onChange={formik.getFieldProps("password").onChange}
                  onBlur={formik.getFieldProps("password").onBlur}
                  helperText={
                    formik.touched.password && Boolean(formik.errors.password)
                      ? String(formik.errors.password)
                      : ""
                  }
                />
                <TextField
                  id="name"
                  startIcon={<ShopWindow />}
                  label="اسم المخزن"
                  inputSize="x-large"
                  value={formik.getFieldProps("name").value}
                  onChange={formik.getFieldProps("name").onChange}
                  onBlur={formik.getFieldProps("name").onBlur}
                  helperText={
                    formik.touched.name && Boolean(formik.errors.name)
                      ? String(formik.errors.name)
                      : ""
                  }
                />
                <TextField
                  id="fullName"
                  startIcon={<Person />}
                  label="اسم مدير المخزن"
                  inputSize="x-large"
                  value={formik.getFieldProps("fullName").value}
                  onChange={formik.getFieldProps("fullName").onChange}
                  onBlur={formik.getFieldProps("fullName").onBlur}
                  helperText={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                      ? String(formik.errors.fullName)
                      : ""
                  }
                />
                <TextField
                  id="location"
                  startIcon={<GeoAltFill />}
                  label="العنوان التفصيلي"
                  inputSize="x-large"
                  value={formik.getFieldProps("location").value}
                  onChange={formik.getFieldProps("location").onChange}
                  onBlur={formik.getFieldProps("location").onBlur}
                  helperText={
                    formik.touched.location && Boolean(formik.errors.location)
                      ? String(formik.errors.location)
                      : ""
                  }
                />
                <TextField
                  id="inventoryPhoneNumber"
                  startIcon={<Telephone />}
                  label="رقم هاتف المخزن"
                  inputSize="x-large"
                  value={formik.getFieldProps("inventoryPhoneNumber").value}
                  onChange={
                    formik.getFieldProps("inventoryPhoneNumber").onChange
                  }
                  onBlur={formik.getFieldProps("inventoryPhoneNumber").onBlur}
                  helperText={
                    formik.touched.inventoryPhoneNumber &&
                    Boolean(formik.errors.inventoryPhoneNumber)
                      ? String(formik.errors.inventoryPhoneNumber)
                      : ""
                  }
                />
                <div className="flex justify-center p-medium">
                  <Button
                    text={buttonContent}
                    type="submit"
                    variant="base-blue"
                    disabled={false}
                    size="lg"
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

export default AddStore;
