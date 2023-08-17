import * as Yup from "yup";

export const editMedicineValidationSchema = Yup.object().shape({
  price: Yup.number().required("السعر الجديد للدواء مطلوب"),
});
