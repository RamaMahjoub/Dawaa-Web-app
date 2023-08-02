import * as Yup from "yup";

export const registerDetailsValidationSchema = Yup.object().shape({
  name: Yup.string().required("اسم المستودع مطلوب"),
  location: Yup.string().required("عنوان المستودع مطلوب"),
  phoneNumber: Yup.string()
    .required("رقم هاتف المستودع مطلوب")
    .max(10, "يجب أن لا يتجاوز رقم الهاتف 10 أرقام"),
});
