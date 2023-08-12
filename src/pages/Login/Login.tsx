import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import TextField from "../../components/TextField/TextField";
import { Envelope, EyeFill, EyeSlashFill, Lock } from "react-bootstrap-icons";
import Button from "../../components/Button/Button";
import { LoginSchema } from "../../Schema/request/login.schema";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { loginValidationSchema } from "../../validations/login.validation";
import { useEffect, useState } from "react";
import { routes } from "../../router/constant";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  login,
  selectNavigationStatus,
  selectStatus,
} from "../../redux/authSlice";
import Loading from "../../components/Loading/Clip";

const Login = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [showPass, setShowPass] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPass((pre) => !pre);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigationStatus = useAppSelector(selectNavigationStatus);
  const status = useAppSelector(selectStatus);
  let buttonContent;

  useEffect(() => {
    if (navigationStatus === "login_succeeded") {
      navigate(`/${routes.ALL_STORES}`);
    }
  }, [navigationStatus, navigate]);

  if (status === "loading") {
    buttonContent = <Loading />;
  } else if (status === "succeeded") {
    buttonContent = "تسجيل الدخول";
  } else if (status === "idle") {
    buttonContent = "تسجيل الدخول";
  } else if (status === "failed") {
    buttonContent = "تسجيل الدخول";
  }
  const initialValues: LoginSchema = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: LoginSchema) => {
    dispatch(login(values));
  };

  const formik = useFormSubmit(
    initialValues,
    handleSubmit,
    loginValidationSchema
  );
  return (
    <div className="w-screen h-screen bg-greyScale-lighter flex items-center justify-center">
      <div className="bg-white py-large px-x-large flex flex-col gap-1 w-64 sm:w-96 rounded-med m-medium">
        <p className="flex justify-center text-greyScale-main text-large my-medium font-semibold">
          {title}
        </p>
        <form
          className="flex flex-col gap-2 my-medium"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-3">
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
          </div>
          <a
            href={`${routes.FORGOT_PASSWORD}`}
            className="text-primary-main text-small"
          >
            هل نسيت كلمة المرور؟
          </a>
          <Button
            variant="base-blue"
            disabled={false}
            text={buttonContent}
            size="xlg"
            type="submit"
          />
        </form>
        <p className="text-greyScale-main text-medium flex  gap-xx-small  justify-center items-center">
          ليس لديك حساب؟
          <a
            href={`${routes.REGISTER}`}
            className="text-primary-main text-medium"
          >
            اشتراك
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;