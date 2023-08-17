/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonHTMLAttributes, FC, ReactNode, useContext } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import tw from "twin.macro";
import { useDrawerStyles } from "../../Layout/styles";
import { DropdownContext } from "./context";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  error?: boolean;
  children: ReactNode;
}

const useDropdownStyles = ({ error }: { error: boolean }) => {
  return {
    dropdownWrapper: css`
      ${tw`relative`}
    `,
    dropdownButton: (open: boolean) => css`
      ${tw`inline-flex items-center justify-between w-full font-bold border border-greyScale-main text-greyScale-main px-x-large py-small rounded-small text-medium`}
      ${open && tw`shadow-sm shadow-primary-dark`}
      ${error && tw`border-red-main text-red-main `}
    `,
  };
};
const Dropdown: FC<Props> = ({ error = false, children, ...rest }) => {
  const styles = useDropdownStyles({ error });
  const iconStyles = useDrawerStyles();
  const { open, handleOpen, changeableTitle } = useContext(DropdownContext);

  return (
    <div css={styles.dropdownWrapper}>
      <button {...rest} onClick={handleOpen} css={styles.dropdownButton(open)}>
        <p className="mx-small">{changeableTitle}</p>
        <ChevronDown css={iconStyles.subMenuArrowIcon(open)} />
      </button>
      {children}
    </div>
  );
};

export default Dropdown;
