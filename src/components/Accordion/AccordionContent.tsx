import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode, useContext } from "react";
import { AccordionContext } from "./context";

interface Props {
  children: ReactNode;
}
const AccordionContent: FC<Props> = ({ children }) => {
  const { open } = useContext(AccordionContext);
  return (
    <>
      {open && (
        <AnimatePresence>
          <motion.div
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.3 }}
            key={"Accordion"}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default AccordionContent;
