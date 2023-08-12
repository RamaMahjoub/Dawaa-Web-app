import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("اسم صاحب المستودع مطلوب")
    .max(16, "يجب أن لا يتجاوز الاسم 16 محرف"),
  email: Yup.string()
    .email("بريد الكتروني خاطئ")
    .max(24, "يجب أن لا يتجاوز البريد الالكتروني 24 محرف")
    .required("البريد الالكتروني مطلوب"),
  password: Yup.string()
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
    .max(16, "يجب أن لا تتجاوز كلمة المرور 16 محرف")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمة المرور غير مطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
});
