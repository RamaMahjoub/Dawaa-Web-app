import { FC, ReactNode, useContext } from "react";
import { SubMenuContext } from "./context";
import { Check } from "react-bootstrap-icons";
import { motion } from "framer-motion";

interface MenuProps {
  open: boolean;
  children: ReactNode;
  divide?: boolean;
}
const Menu: FC<MenuProps> = ({ open, children, divide }) => {
  return (
    <motion.div
      animate={open ? { display: "flex" } : { display: "none" }}
      className={`${
        divide && "divide-y"
      } bg-white shadow-sm sm:min-w-[135px] top-32 float-right absolute z-[9999]  rounded-small flex flex-col gap-1`}
    >
      {children}
    </motion.div>
  );
};

export default Menu;

interface Props {
  title: string;
  children: ReactNode;
}
export const SubMenu: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <p className="text-greyScale-light text-small px-x-large py-x-small">
        {title}
      </p>
      {children}
    </div>
  );
};

interface MenuItemProps {
  content: string;
}

export const MenuItem: FC<MenuItemProps> = ({ content }) => {
  const { selected, handleSelect } = useContext(SubMenuContext);
  return (
    <p
      className="text-greyScale-main text-small py-x-small px-x-large hover:bg-greyScale-lighter cursor-pointer flex gap-1 items-center relative"
      onClick={() => handleSelect(content)}
    >
      {selected === content && (
        <Check className="text-primary-main absolute right-1" />
      )}
      {content}
    </p>
  );
};
