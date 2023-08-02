import { FC } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const RootLayout: FC = () => {
  return (
    <div className="flex gap-1 w-screen">
      <Sidebar />
      <main className="flex-1" style={{width: "calc(100% - 260px)"}}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
