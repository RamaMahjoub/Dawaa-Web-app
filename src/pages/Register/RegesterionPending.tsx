import { useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";
import { CheckCircle } from "react-bootstrap-icons";

const RegesterionPending = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  return (
    <div className="w-screen h-screen py-24 px-60 bg-greyScale-lighter flex items-center justify-center">
      <div className="rounded-med py-20 px-24 bg-white w-full gap-large h-full flex flex-col justify-center items-center">
        <CheckCircle className="w-24 h-24 text-primary-main" />
        <p className="text-greyScale-dark text-xx-large">{title}</p>
        <p className="text-greyScale-main text-large">
          يبتم استلام معلوماتك بنجاح وتم إرسالها لفريق الإدارة للمراجعة
          والموافقة على طلب التسجيل الخاص بك.سيتم دراسة المعلومات التي قدمتها
          والتحقق من صحتها واكتمالها وسنقوم بإبلاغك بنتيجة المراجعة في أقرب وقت
          ممكن.
        </p>
      </div>
    </div>
  );
};

export default RegesterionPending;
