import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("اسم صاحب المستودع مطلوب"),
  email: Yup.string()
    .email("بريد الكتروني خاطئ")
    .required("البريد الالكتروني مطلوب"),
  password: Yup.string()
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string().required("تأكيد كلمة المرور مطلوب"),
});
