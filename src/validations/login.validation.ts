import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("بريد الكتروني خاطئ")
    .max(24, "يجب أن لا يتجاوز البريد الالكتروني 24 محرف")
    .required("البريد الالكتروني مطلوب"),
  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .max(16, "يجب أن لا تتجاوز كلمة المرور 16 محرف")
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
});
