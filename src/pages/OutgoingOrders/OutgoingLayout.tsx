import Header, { HeaderTypes } from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { HeaderTitle } from "../../utils/HeaderTitle";

const OutgoingLayout = () => {
  const { pathname } = useLocation();
  const title = HeaderTitle(pathname);
  return (
    <div className="flex flex-col h-screen">
      <Header title={title!} leftSpace={HeaderTypes.FREE} />
      <Outlet />
    </div>
  );
};

export default OutgoingLayout;
