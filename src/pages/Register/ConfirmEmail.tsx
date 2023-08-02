import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";

const ConfirmEmail = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  return (
    <div className="w-screen h-screen bg-greyScale-lighter flex items-center justify-center">
      <div className="bg-white py-large px-x-large flex flex-col gap-1 w-96 rounded-med m-medium">
        <p className="flex justify-center text-greyScale-main text-large my-medium font-semibold">
          {title}
        </p>
        <p className="text-greyScale-main text-small flex justify-center">
          لتأكيد عنوان بريدك الالكتروني، يرجى إدخال الرمز المكون من 6 أرقام الذي
          أرسلناه للتو إلى بريدك...
        </p>
        <div>
          <form className="flex flex-col gap-2 m-medium">
            <div className="flex gap-2  items-center justify-center">
              <TextField inputSize="small" maxLength={1} />
              <TextField inputSize="small" maxLength={1} />
              <TextField inputSize="small" maxLength={1} />
              <TextField inputSize="small" maxLength={1} />
              <TextField inputSize="small" maxLength={1} />
              <TextField inputSize="small" maxLength={1} />
            </div>
            <a href="/" className="text-primary-main text-small">
              إعادة إرسال الرمز
            </a>
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

export default ConfirmEmail;
