import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import IconBadge from "../../components/Badge/IconBadge";
import { BoxArrowRight } from "react-bootstrap-icons";
import { BadgeStatus } from "../../components/Badge/TextBadge";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import Header, { HeaderTypes } from "../../components/Header/Header";
import { useCallback, useEffect, useState } from "react";
import Logout from "./Logout/Logout";
import { RegisterDetailSchema } from "../../Schema/request/registerDetails.schema";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { registerDetailsValidationSchema } from "../../validations/registerDetails.validation";
import SendComplaint from "./SendComplaint";

const Settings = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  const [open, setOpen] = useState<boolean>(false);
  const [openComplaint, setOpenComplaint] = useState<boolean>(false);
  const [hasInitialValuesChanged, setHasInitialValuesChanged] = useState(false);
  const initialValues: RegisterDetailSchema = {
    // ownerName: "غازي محجوب",
    name: "محجوب",
    location: "ميدان مجتهد",
    // ownerPhone: "0930591740",
    phoneNumber: "8820530",
  };

  const handleSubmit = (values: RegisterDetailSchema) => {
    alert(JSON.stringify(values, null, 2));
  };

  const formik = useFormSubmit(
    initialValues,
    handleSubmit,
    registerDetailsValidationSchema
  );
  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);

  const handleOpenComplaint = useCallback(() => {
    setOpenComplaint((pre) => !pre);
  }, []);

  useEffect(() => {
    const hasChanged = Object.keys(initialValues).some(
      (key) =>
        initialValues[key as keyof RegisterDetailSchema] !== formik.values[key]
    );

    setHasInitialValuesChanged(hasChanged);
  }, [formik.values]);
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header
          title={title!}
          action={
            <Button
              text="إرسال شكوى"
              variant="base-blue"
              disabled={false}
              size="lg"
              onClick={handleOpenComplaint}
            />
          }
          leftSpace={HeaderTypes.FREE}
        />
        <div className="flex items-center justify-between w-full gap-1 p-large text-greyScale-light bg-greyScale-lighter text-x-large">
          <div
            className="flex items-center gap-small px-large text-red-main text-x-large cursor-pointer"
            onClick={handleOpen}
          >
            <IconBadge icon={<BoxArrowRight />} status={BadgeStatus.DANGER} />
            تسجيل الخروج
          </div>
        </div>
        <div className="flex-1 bg-greyScale-lighter flex flex-col items-center">
          <div className="bg-white py-large px-x-large flex flex-col gap-1 w-64 sm:w-96 rounded-med m-medium">
            <p className="flex justify-center text-greyScale-main text-large my-medium font-semibold">
              المعلومات الشخصية
            </p>
            {hasInitialValuesChanged && (
              <p className="text-greyScale-main text-small  mb-medium flex justify-center">
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
                id="ownerName"
                label="الاسم الكامل"
                inputSize="x-large"
                value={formik.getFieldProps("ownerName").value}
                onChange={formik.getFieldProps("ownerName").onChange}
                onBlur={formik.getFieldProps("ownerName").onBlur}
                helperText={
                  formik.touched.ownerName && Boolean(formik.errors.ownerName)
                    ? String(formik.errors.ownerName)
                    : ""
                }
              />
              <TextField
                id="warehouseName"
                label="اسم المستودع"
                inputSize="x-large"
                value={formik.getFieldProps("warehouseName").value}
                onChange={formik.getFieldProps("warehouseName").onChange}
                onBlur={formik.getFieldProps("warehouseName").onBlur}
                helperText={
                  formik.touched.warehouseName &&
                  Boolean(formik.errors.warehouseName)
                    ? String(formik.errors.warehouseName)
                    : ""
                }
              />
              <TextField
                id="address"
                label="العنوان التفصيلي"
                inputSize="x-large"
                value={formik.getFieldProps("address").value}
                onChange={formik.getFieldProps("address").onChange}
                onBlur={formik.getFieldProps("address").onBlur}
                helperText={
                  formik.touched.address && Boolean(formik.errors.address)
                    ? String(formik.errors.address)
                    : ""
                }
              />
              <TextField
                id="ownerPhone"
                label="رقم هاتفك"
                inputSize="x-large"
                value={formik.getFieldProps("ownerPhone").value}
                onChange={formik.getFieldProps("ownerPhone").onChange}
                onBlur={formik.getFieldProps("ownerPhone").onBlur}
                helperText={
                  formik.touched.ownerPhone && Boolean(formik.errors.ownerPhone)
                    ? String(formik.errors.ownerPhone)
                    : ""
                }
              />
              <TextField
                id="warehousePhone"
                label="رقم هاتف المستودع"
                inputSize="x-large"
                value={formik.getFieldProps("warehousePhone").value}
                onChange={formik.getFieldProps("warehousePhone").onChange}
                onBlur={formik.getFieldProps("warehousePhone").onBlur}
                helperText={
                  formik.touched.warehousePhone &&
                  Boolean(formik.errors.warehousePhone)
                    ? String(formik.errors.warehousePhone)
                    : ""
                }
              />
              <Button
                variant="base-blue"
                disabled={!hasInitialValuesChanged}
                text="حفظ التعديلات"
                size="xlg"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
      <Logout open={open} handleOpen={handleOpen} />
      <SendComplaint open={openComplaint} handleOpen={handleOpenComplaint} />
    </>
  );
};

export default Settings;
