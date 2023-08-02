import { FC } from "react";
import { getMonth } from "../../utils/Month";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

interface Props {
  date: any;
  decreaseMonth: any;
  increaseMonth: any;
}
const DatepickerHeader: FC<Props> = ({
  date,
  decreaseMonth,
  increaseMonth,
}) => {
  const renderMonthText = (date: Date): string => {
    return getMonth(date.getMonth() + 1)!;
  };
  return (
    <div className="flex justify-between items-center p-4">
      <span className=" text-greyScale-main font-semibold text-x-large">
        {renderMonthText(date)}
      </span>
      <span className="flex gap-medium">
        <button
          className="w-6 h-4 text-greyScale-light hover:bg-greyScale-lighter flex justify-center items-center rounded-med "
          onClick={decreaseMonth}
        >
          <ChevronRight />
        </button>
        <button
          className="w-6 h-4 text-greyScale-light hover:bg-greyScale-lighter flex justify-center items-center rounded-med "
          onClick={increaseMonth}
        >
          <ChevronLeft />
        </button>
      </span>
    </div>
  );
};

export default DatepickerHeader;
