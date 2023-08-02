const NotFound = require("./../../assets/not-found.png");
const PageNotFound = () => {
  return (
    <div className="w-screen h-screen py-24 px-60 bg-greyScale-lighter flex items-center justify-center">
      <div className="rounded-med bg-white w-full gap-large h-full flex flex-col justify-center items-center">
        <img src={NotFound} alt="page-not-found" width={300} height={300} />
        <p className="text-greyScale-dark text-xx-large">
          عذراً، لا يمكن اعثور على الصفحة
        </p>
        <p className="text-greyScale-main text-large">
          يبدو أن الصفحة التي كنت تبحث عنها قد تم نقلها أو حذفها أو أنها غير
          موجودة.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
