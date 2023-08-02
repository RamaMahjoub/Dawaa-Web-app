/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, HTMLAttributes, useContext } from "react";
import tw from "twin.macro";
import { DropdownContext } from "./context";
interface Props extends HTMLAttributes<HTMLParagraphElement> {
  title: string;
}
const useStyles = () => {
  return {
    dropdownItem: css`
      ${tw`p-large w-full rounded-small hover:bg-greyScale-lighter cursor-pointer`}
    `,
  };
};

const DropdownItem: FC<Props> = ({ title, ...rest }) => {
  const { handleOpen, handleChangeTitle } = useContext(DropdownContext);
  const handleClick = () => {
    handleChangeTitle(title);
    handleOpen();
  };
  const styles = useStyles();
  return (
    <p css={styles.dropdownItem} {...rest} onClick={handleClick}>
      {title}
    </p>
  );
};

export default DropdownItem;
