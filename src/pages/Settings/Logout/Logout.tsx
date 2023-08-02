import { FC } from "react";
import Button from "../../../components/Button/Button";
import { XSquareFill } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";

interface Props {
  open: boolean;
  handleOpen: () => void;
}

const Logout: FC<Props> = ({ open, handleOpen }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large   text-greyscale-main text-xx-large border-solid border-b border-greyScale-light flex justify-between items-center">
              تسجيل الخروج
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col gap-small px-medium py-medium  flex-1 items-center overflow-auto scrollbar-thin">
              <p className="text-x-large text-greyScale-main">
                انت على وشك تسجيل الخروج من حسابك، هل تريد المتابعة؟
              </p>
            </div>
            <div className="p-medium flex gap-small justify-end">
              <Button
                text="متابعة"
                variant="red"
                disabled={false}
                size={isMobile ? "med" : "lg"}
              />
              <Button
                text="إلغاء"
                variant="base-blue"
                disabled={false}
                size={isMobile ? "med" : "lg"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
