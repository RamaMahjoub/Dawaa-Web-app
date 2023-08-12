import * as Yup from "yup";

export const registerDetailsValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("اسم المستودع مطلوب")
    .max(16, "يجب أن لا يتجاوز الاسم 16 محرف"),
  location: Yup.string()
    .required("عنوان المستودع مطلوب")
    .max(255, "يجب أن لا يتجاوز عنوان المستودع 255 محرف"),
  phoneNumber: Yup.string()
    .required("رقم هاتف المستودع مطلوب")
    .max(10, "يجب أن لا يتجاوز رقم الهاتف 10 أرقام"),
});
