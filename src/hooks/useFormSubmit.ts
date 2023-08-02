import { useFormik } from "formik";

export const useFormSubmit = (
  initialValues: any,
  submitHandler: (values: any) => any,
  validationSchema?: any,
) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
  });

  return formik;
};
