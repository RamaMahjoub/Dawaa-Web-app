import { FC, useState } from "react";
import Button from "../../components/Button/Button";
import { CheckCircle, XSquareFill } from "react-bootstrap-icons";
import { Rating } from "@mui/material";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const Review: FC<Props> = ({ open, handleOpen }) => {
  const [value, setValue] = useState<number | null>(null);
  const handleReview = (newVal: number | null) => {
    console.log(newVal);
    setValue(newVal);
  };

  const handleSendRequest = () => {
    const request = {
      evaluation: value,
    };
    console.log(request);
  };
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] h-max flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between p-x-large text-greyscale-main text-xx-large">
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col items-center flex-1 overflow-auto gap-small px-medium scrollbar-thin">
              <CheckCircle className="w-20 h-20 text-primary-main" />
              <p className="text-greyScale-dark text-xx-large">
                تقييم التعامل مع هذه الشركة
              </p>
              <p className="text-greyScale-main text-large">
                شاركنا رأيك حول التعامل مع هذه الشركة
              </p>
              <Rating
              
                size="large"
                value={value}
                onChange={(_, newValue) => {
                  handleReview(newValue);
                }}
              />
            </div>
            <div className="flex justify-center p-medium">
              <Button
                text="تقييم"
                variant="base-blue"
                disabled={false}
                size="lg"
                onClick={handleSendRequest}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
