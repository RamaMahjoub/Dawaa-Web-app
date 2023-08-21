import * as Yup from "yup";

export const addPaymentValidationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("المبلغ المدفوع مطلوب")
    .moreThan(0, "بجب أن يكون المبلغ المضاف أكبر من الصقر"),
});
