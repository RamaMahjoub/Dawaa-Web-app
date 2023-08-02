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
import { registerStore } from "../../../redux/storeSlice";

interface Props {
  open: boolean;
  handleOpen: () => void;
}

const AddStore: FC<Props> = ({ open, handleOpen }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPass((pre) => !pre);
  };
  const initialValues: RegisterStoreSchema = {
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    name: "",
    location: "",
    inventoryPhoneNumber: "",
  };
  const handleSubmit = (values: RegisterStoreSchema) => {
    // dispatch(registerStore(values));
  };
  const formik = useFormSubmit(
    initialValues,
    handleSubmit,
    registerStoreValidationSchema
  );
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large text-greyscale-main text-xx-large border-solid border-b border-greyScale-light flex justify-between items-center">
              مخزن جديد
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col gap-small px-medium flex-1  py-medium overflow-auto scrollbar-thin">
              <form className="flex flex-col gap-3">
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
                  id="phoneNumber"
                  startIcon={<Telephone />}
                  label="رقم هاتف مدير المخزن"
                  inputSize="x-large"
                  value={formik.getFieldProps("phoneNumber").value}
                  onChange={formik.getFieldProps("phoneNumber").onChange}
                  onBlur={formik.getFieldProps("phoneNumber").onBlur}
                  helperText={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                      ? String(formik.errors.phoneNumber)
                      : ""
                  }
                />
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
              </form>
            </div>
            <div className="p-medium flex justify-center">
              <Button
                text="حفظ"
                type="submit"
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

export default AddStore;
