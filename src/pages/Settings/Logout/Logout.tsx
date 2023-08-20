import { FC, useEffect } from "react";
import Button from "../../../components/Button/Button";
import { XSquareFill } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { logout, selectLogoutStatus } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../router/constant";
import { toast } from "react-toastify";
import { ResponseStatus } from "../../../enums/ResponseStatus";

interface Props {
  open: boolean;
  handleOpen: () => void;
}

const Logout: FC<Props> = ({ open, handleOpen }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectLogoutStatus);
  const handleLogout = () => {
    dispatch(logout());
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) {
      navigate(`/${routes.LOGIN}`);
      toast.success("تم تسجيل الخروج بنجاح");
    }
  }, [status, navigate]);
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="flex items-center justify-between border-b border-solid p-x-large text-greyscale-main text-xx-large border-greyScale-light">
              تسجيل الخروج
              <XSquareFill
                className="transition-colors duration-300 ease-in text-greyScale-light hover:text-primary-main"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col items-center flex-1 overflow-auto gap-small px-medium py-medium scrollbar-thin">
              <p className="text-x-large text-greyScale-main">
                انت على وشك تسجيل الخروج من حسابك، هل تريد المتابعة؟
              </p>
            </div>
            <div className="flex justify-end p-medium gap-small">
              <Button
                text="تسجيل الخروج"
                variant="red"
                disabled={false}
                size={isMobile ? "med" : "lg"}
                onClick={handleLogout}
                status={status}
              />
              <Button
                text="إلغاء"
                variant="base-blue"
                disabled={false}
                size={isMobile ? "med" : "lg"}
                onClick={handleOpen}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
