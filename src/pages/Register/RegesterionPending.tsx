import { useEffect } from "react";
import Pending from "../../components/Pending";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  isAccepted,
  selectIsAcceptedData,
  selectIsAcceptedStatus,
  selectLoginStatus,
} from "../../redux/authSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/constant";
import { toast } from "react-toastify";
import { ResponseStatus } from "../../enums/ResponseStatus";

const RegesterionPending = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectIsAcceptedStatus);
  const data = useAppSelector(selectIsAcceptedData);
  const navigata = useNavigate();
  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED && data === true) {
      navigata(`/${routes.LOGIN}`);
      toast.success("تم قبول اشتراكك في النظام");
    }
  }, [status, data, navigata]);
  useEffect(() => {
    dispatch(isAccepted());
    const intervalId = setInterval(() => {
      dispatch(isAccepted());
    }, 30 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);
  return (
    <div className="flex items-center justify-center w-screen h-screen py-24 px-60 bg-greyScale-lighter">
      <Pending />
    </div>
  );
};

export default RegesterionPending;
