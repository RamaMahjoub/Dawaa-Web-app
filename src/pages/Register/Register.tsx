import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import TextField from "../../components/TextField/TextField";
import {
  Envelope,
  EyeFill,
  EyeSlashFill,
  Lock,
  Person,
} from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import { RegisterSchema } from "../../Schema/request/register.schema";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { registerValidationSchema } from "../../validations/register.validation";
import { useEffect, useState } from "react";
import { routes } from "../../router/constant";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  login,
  register,
  selectNavigationStatus,
  selectStatus,
} from "../../redux/authSlice";
import Loading from "../../components/Loading/Clip";

const Register = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPass((pre) => !pre);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPass((pre) => !pre);
  };
  const dispatch = useAppDispatch();
  const navigationStatus = useAppSelector(selectNavigationStatus);
  const status = useAppSelector(selectStatus);
  let buttonContent;

  useEffect(() => {
    if (navigationStatus === "register_succeeded") {
      navigate(`/${routes.REGISTER_DETAILS}`);
    }
  }, [navigationStatus, navigate]);

  if (status === "loading") {
    buttonContent = <Loading />;
  } else if (status === "succeeded") {
    buttonContent = "اشنراك";
  } else if (status === "idle") {
    buttonContent = "اشنراك";
  } else if (status === "failed") {
    buttonContent = "اشنراك";
  }

  const initialValues: RegisterSchema = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: RegisterSchema) => {
    dispatch(register(values)).then(() => {
      dispatch(login({ email: values.email, password: values.password }));
    });
  };

  const formik = useFormSubmit(
    initialValues,
    handleSubmit,
    registerValidationSchema
  );

  return (
    <div className="w-screen h-screen bg-greyScale-lighter flex items-center justify-center">
      <div className="bg-white py-large px-x-large flex flex-col gap-1 w-64 sm:w-96 rounded-med m-medium">
        <p className="flex justify-center text-greyScale-main text-large my-medium font-semibold">
          {title}
        </p>
        <form
          className="flex flex-col gap-3 my-medium"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="fullName"
            startIcon={<Person />}
            label="الاسم الكامل"
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
            id="confirmPassword"
            startIcon={<Lock />}
            endIcon={
              showConfirmPass ? (
                <EyeSlashFill onClick={handleShowConfirmPassword} />
              ) : (
                <EyeFill onClick={handleShowConfirmPassword} />
              )
            }
            type={showConfirmPass ? "text" : "password"}
            label="تأكيد كلمة المرور"
            inputSize="x-large"
            value={formik.getFieldProps("confirmPassword").value}
            onChange={formik.getFieldProps("confirmPassword").onChange}
            onBlur={formik.getFieldProps("confirmPassword").onBlur}
            helperText={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
                ? String(formik.errors.confirmPassword)
                : ""
            }
          />
          <Button
            variant="base-blue"
            disabled={false}
            text={buttonContent}
            size="xlg"
            type="submit"
          />
        </form>
        <p className="text-greyScale-main text-medium flex gap-xx-small justify-center items-center">
          لديك حساب بالفعل؟
          <a href={`${routes.LOGIN}`} className="text-primary-main text-medium">
            تسجيل الدخول
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
