/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, HTMLAttributes, useContext } from "react";
import tw from "twin.macro";
import { DropdownContext } from "./context";
interface Props extends HTMLAttributes<HTMLParagraphElement> {
  title: string;
  subTitle?: any;
  handleSelectValue?: (value: string) => void;
}
const useStyles = () => {
  return {
    dropdownItem: css`
      ${tw`flex flex-col w-full cursor-pointer p-large rounded-small hover:bg-greyScale-lighter`}
    `,
  };
};

const DropdownItem: FC<Props> = ({
  title,
  subTitle,
  handleSelectValue,
  ...rest
}) => {
  const { handleOpen, handleChangeTitle } = useContext(DropdownContext);
  const handleClick = () => {
    handleChangeTitle(title);
    handleOpen();
    handleSelectValue !== undefined && handleSelectValue(title);
  };
  const styles = useStyles();
  return (
    <p css={styles.dropdownItem} {...rest} onClick={handleClick}>
      {title}
      <p className="text-greyScale-light">{subTitle && subTitle}</p>
    </p>
  );
};

export default DropdownItem;
