const NoDataFounded = require("./../../assets/folder2.png");

const NoData = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-small">
      <img src={NoDataFounded} alt="no-data" height={45} width={45} className="m-auto " />
      <p className="m-auto text-greyScale-main text-x-large ">لا يوجد عناصر</p>
    </div>
  );
};

export default NoData;
