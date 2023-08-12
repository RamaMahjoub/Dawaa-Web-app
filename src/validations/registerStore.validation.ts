import * as Yup from "yup";

export const registerStoreValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("اسم مدير المخزن مطلوب")
    .max(16, "يجب أن لا يتجاوز الاسم 16 محرف"),
  email: Yup.string()
    .email("بريد الكتروني خاطئ")
    .required("البريد الالكتروني مطلوب")
    .max(24, "يجب أن لا يتجاوز البريد الالكتروني 24 محرف"),
  password: Yup.string()
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
    .max(16, "يجب أن لا تتجاوز كلمة المرور 16 محرف")
    .required("كلمة المرور مطلوبة"),
  name: Yup.string()
    .required("اسم المخزن مطلوب")
    .max(16, "يجب أن لا يتجاوز الاسم 16 محرف"),
  location: Yup.string()
    .required("موقع المخزن مطلوب")
    .max(255, "يجب أن لا يتجاوز عنوان المخزن 255 محرف"),
  inventoryPhoneNumber: Yup.string().required("رقم هاتف المخزن مطلوب"),
});
