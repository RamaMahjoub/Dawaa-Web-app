import { CheckCircle } from "react-bootstrap-icons";

const Pending = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-24 py-20 bg-white rounded-med gap-large">
      <CheckCircle className="w-24 h-24 text-primary-main" />
      <p className="text-greyScale-dark text-xx-large">
        مراجعة المعلومات الشخصية
      </p>
      <p className="text-greyScale-main text-large">
        يبتم استلام معلوماتك بنجاح وتم إرسالها لفريق الإدارة للمراجعة والموافقة
        على طلب التسجيل الخاص بك.سيتم دراسة المعلومات التي قدمتها والتحقق من
        صحتها واكتمالها وسنقوم بإبلاغك بنتيجة المراجعة في أقرب وقت ممكن.
      </p>
    </div>
  );
};

export default Pending;
