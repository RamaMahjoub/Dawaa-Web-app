import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Accordion: FC<Props> = ({ children }) => {
    
  return (
    <div className="bg-white rounded-med p-large flex flex-col gap-medium">
      {children}
    </div>
  );
};

export default Accordion;
