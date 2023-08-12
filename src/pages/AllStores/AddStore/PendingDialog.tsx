import React, { FC } from "react";
import { XSquareFill } from "react-bootstrap-icons";
import Pending from "../../../components/Pending";
interface Props {
  open: boolean;
  handleOpen: () => void;
}

const PendingDialog: FC<Props> = ({ open, handleOpen }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[435px] flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between p-x-large text-greyscale-main text-xx-large">
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <Pending />
          </div>
        </div>
      )}
    </>
  );
};

export default PendingDialog;
