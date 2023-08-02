/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import tw from "twin.macro";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  icon: ReactNode;
}

const useIconButtonStyles = () => {
  return {
    buttonWrapper: (color: string) => css`
      ${tw`w-10 py-x-small px-x-large rounded-small flex items-center justify-center`}
      ${color === "base-blue"
        ? css`
            ${tw`bg-primary-main text-white hover:bg-primary-dark hover:translate-y-[1px]`};
          `
        : color === "light-grey" &&
          css`
            ${tw`bg-greyScale-lighter text-greyScale-main hover:text-greyScale-light`};
          `}
    `,
    buttonContent: css`
      ${tw`flex items-center font-bold `}
    `,
  };
};
const IconButton: FC<Props> = ({ color, icon, ...rest }) => {
  const styles = useIconButtonStyles();
  return (
    <button css={styles.buttonWrapper(color)} {...rest}>
      <span css={styles.buttonContent}>{icon}</span>
    </button>
  );
};

export default IconButton;
