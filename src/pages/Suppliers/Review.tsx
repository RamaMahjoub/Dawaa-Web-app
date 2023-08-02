import { FC } from "react";
import Button from "../../components/Button/Button";
import { CheckCircle, XSquareFill } from "react-bootstrap-icons";
import { Rating } from "@mui/material";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const Review: FC<Props> = ({ open, handleOpen }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large flex items-center justify-between  text-greyscale-main text-xx-large">
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col gap-small px-medium flex-1 items-center overflow-auto scrollbar-thin">
              <CheckCircle className="w-20 h-20 text-primary-main" />
              <p className="text-greyScale-dark text-xx-large">
                تقييم التعامل مع هذه الشركة
              </p>
              <p className="text-greyScale-main text-large">
                شاركنا رأيك حول التعامل مع هذه الشركة
              </p>
              <Rating size="large" />
            </div>
            <div className="p-medium flex justify-center">
              <Button
                text="تقييم"
                variant="base-blue"
                disabled={false}
                size="lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
