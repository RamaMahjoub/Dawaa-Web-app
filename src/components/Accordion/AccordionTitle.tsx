import { FC, ReactNode, useContext } from "react";
import { AccordionContext } from "./context";
import { ChevronDown } from "react-bootstrap-icons";

interface Props {
  children: ReactNode;
}
const AccordionTitle: FC<Props> = ({ children }) => {
  const { open, handleOpen } = useContext(AccordionContext);
  return (
    <div
      className="flex items-center gap-large cursor-pointer"
      onClick={handleOpen}
    >
      {children}
      <ChevronDown
        className={`${open && "rotate-180"} transition-all duration-300`}
      />
    </div>
  );
};

export default AccordionTitle;
