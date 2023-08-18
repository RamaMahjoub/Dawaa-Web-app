import Button from "./Button/Button";
import { routes } from "../router/constant";

const TokenExpired = () => {
  const handleClick = () => {
    window.location.replace(`/${routes.LOGIN}`);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
      <div className="w-[235px] sm:w-[435px] flex flex-col rounded-small bg-white">
        <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
          انتهت صلاحية الجلسة
        </p>
        <div className="flex flex-col items-center flex-1 overflow-auto gap-small px-medium py-medium scrollbar-thin">
          <p className="text-x-large text-greyScale-main">
            انتهت صلاحية الجلسة الخاصة بك. الرجاء تسجيل الدخول مرة أخرى
            للمتابعة.
          </p>
        </div>
        <div className="flex justify-end p-medium gap-small">
          <Button
            text="تسجيل الدخول"
            variant="base-blue"
            disabled={false}
            size="lg"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenExpired;
