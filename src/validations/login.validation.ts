import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("بريد الكتروني خاطئ")
    .required("البريد الالكتروني مطلوب"),
  password: Yup.string()
    .required("كلمة المرور مطلوبة"),
});
