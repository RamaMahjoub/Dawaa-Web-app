import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import { Envelope } from "react-bootstrap-icons";

const ForgotPassword = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  return (
    <div className="w-screen h-screen bg-greyScale-lighter flex items-center justify-center">
      <div className="bg-white py-large px-x-large flex flex-col gap-1 w-96 rounded-med m-medium">
        <p className="flex justify-center text-greyScale-main text-large my-medium font-semibold">
          {title}
        </p>
        <p className="text-greyScale-main text-small flex justify-center">
          أدخل عنوان البريد الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
          الخاصة بك...
        </p>
        <div>
          <form className="flex flex-col gap-2 m-medium">
            <TextField
              startIcon={<Envelope />}
              placeholder="ايميل"
              inputSize="x-large"
            />
            <Button
              variant="base-blue"
              disabled={false}
              text="إرسال"
              size="xlg"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
