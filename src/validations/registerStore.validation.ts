import * as Yup from "yup";

export const registerStoreValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("اسم مدير المخزن مطلوب"),
  phoneNumber: Yup.string()
    .required("رقم هاتف مدير المخزن مطلوب")
    .max(10, "يجب أن لا يتجاوز رقم الهاتف 10 أرقام"),
  email: Yup.string()
    .email("بريد الكتروني خاطئ")
    .required("البريد الالكتروني مطلوب"),
  password: Yup.string()
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  name: Yup.string().required("اسم المخزن مطلوب"),
  location: Yup.string().required("موقع المخزن مطلوب"),
  inventoryPhoneNumber: Yup.string().required("رقم هاتف المخزن مطلوب"),
});
