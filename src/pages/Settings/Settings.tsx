import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import IconBadge from "../../components/Badge/IconBadge";
import { BoxArrowRight } from "react-bootstrap-icons";
import { BadgeStatus } from "../../components/Badge/TextBadge";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import Header, { HeaderTypes } from "../../components/Header/Header";
import { useEffect, useMemo, useState } from "react";
import Logout from "./Logout/Logout";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { registerDetailsValidationSchema } from "../../validations/registerDetails.validation";
import SendComplaint from "./SendComplaint";
import { useOpenToggle } from "../../hooks/useOpenToggle";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  getInfo,
  selectGetInfoData,
  selectGetInfoStatus,
  selectUpdateInfoStatus,
  updateInfo,
} from "../../redux/authSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import PendingDialog from "../AllStores/AddStore/PendingDialog";
import { ResponseStatus } from "../../enums/ResponseStatus";
import { CompleteInfo } from "../../Schema/Requests/CompleteInfo";

const Settings = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const { open: openLogout, handleOpen: handleLogout } = useOpenToggle();
  const { open: openComplaint, handleOpen: handleComplaint } = useOpenToggle();
  const { open: openPending, handleOpen: handleOpenPending } = useOpenToggle();
  const [hasInitialValuesChanged, setHasInitialValuesChanged] = useState(false);
  const data = useAppSelector(selectGetInfoData);
  const status = useAppSelector(selectGetInfoStatus);
  const updateStatus = useAppSelector(selectUpdateInfoStatus);
  const info = useMemo(
    () => ({
      name: "",
      phoneNumber: "",
      location: "",
    }),
    []
  );
  const handleSubmit = () => {
    let request = {};
    Object.keys(info).forEach((key) => {
      if (data.data[key] !== formik.values[key]) {
        request = { ...request, [key]: formik.values[key] };
      }
    });
    dispatch(updateInfo(request));
  };

  useEffect(() => {
    if (updateStatus === ResponseStatus.SUCCEEDED) {
      formik.setValues({
        name: data.data.name,
        phoneNumber: data.data.phoneNumber,
        location: data.data.location,
      });
      handleOpenPending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateStatus, handleOpenPending]);

  const formik = useFormSubmit(
    info,
    handleSubmit,
    registerDetailsValidationSchema
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      formik.setValues({
        name: data.data.name,
        phoneNumber: data.data.phoneNumber,
        location: data.data.location,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, data]);

  useEffect(() => {
    const hasChanged = Object.keys(info).some(
      (key) => info[key as keyof CompleteInfo] !== formik.values[key]
    );

    setHasInitialValuesChanged(hasChanged);
  }, [formik.values, info]);
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header
          title={title!}
          action={
            <Button
              text="إرسال شكوى"
              variant="base-blue"
              disabled={false}
              size="lg"
              onClick={handleComplaint}
            />
          }
          leftSpace={HeaderTypes.FREE}
        />
        <div className="flex items-center justify-between w-full gap-1 p-large text-greyScale-light bg-greyScale-lighter text-x-large">
          <div
            className="flex items-center cursor-pointer gap-small px-large text-red-main text-x-large"
            onClick={handleLogout}
          >
            <IconBadge icon={<BoxArrowRight />} status={BadgeStatus.DANGER} />
            تسجيل الخروج
          </div>
        </div>
        <div className="flex flex-col items-center flex-1 bg-greyScale-lighter">
          <div className="flex flex-col w-64 gap-1 bg-white py-large px-x-large sm:w-96 rounded-med m-medium">
            <p className="flex justify-center font-semibold text-greyScale-main text-large my-medium">
              المعلومات الشخصية
            </p>
            {hasInitialValuesChanged && (
              <p className="flex justify-center text-greyScale-main text-small mb-medium">
                سيتم مراجعة المعلومات التي تقدمها من قبل فريقنا المختص وسيتم
                الموافقة على اشتراكك بعد التحقق من صحة واكتمال المعلومات
                المقدمة.
              </p>
            )}
            <form
              className="flex flex-col gap-3"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="name"
                label="اسم المستودع"
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
                id="phoneNumber"
                label="رقم هاتف المستودع"
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
              <Button
                variant="base-blue"
                disabled={!hasInitialValuesChanged}
                text="حفظ التعديلات"
                size="xlg"
                type="submit"
                status={updateStatus}
              />
            </form>
          </div>
        </div>
      </div>
      <Logout open={openLogout} handleOpen={handleLogout} />
      <SendComplaint open={openComplaint} handleOpen={handleComplaint} />
      <PendingDialog open={openPending} handleOpen={handleOpenPending} />
    </>
  );
};

export default Settings;
