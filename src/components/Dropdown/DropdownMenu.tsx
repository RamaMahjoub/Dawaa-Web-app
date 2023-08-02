/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode, useContext } from "react";
import tw from "twin.macro";
import { DropdownContext } from "./context";

interface Props {
  children: ReactNode;
}
const useStyles = () => {
  return {
    itemsWrapper: css`
      ${tw`absolute top-12 w-full max-h-[250px] overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter shadow-sm z-[999] bg-white rounded-small text-medium`}
    `,
  };
};

const DropdownMenu: FC<Props> = ({ children }) => {
  const styles = useStyles();
  const { open } = useContext(DropdownContext);
  return (
    <AnimatePresence>
      <motion.div
        css={styles.itemsWrapper}
        initial={{ height: 0 }}
        exit={{ height: 0 }}
        animate={{ height: open ? "fit-content" : 0 }}
        transition={{ duration: 0.3 }}
        key={"dropdown"}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default DropdownMenu;
