/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import tw from "twin.macro";
import { ResponseStatus } from "../../enums/ResponseStatus";
import Clip from "../Loading/Clip";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof variants;
  size?: keyof typeof sizes;
  disabled: boolean;
  text: ReactNode;
  icon?: ReactNode;
  start?: boolean;
  status?: string;
}

const variants = {
  red: tw`bg-red-light text-red-main hover:translate-y-[1px]`,
  green: tw`bg-green-light text-green-main hover:translate-y-[1px]`,
  "base-blue": tw`bg-primary-main text-white hover:bg-primary-dark hover:translate-y-[1px]`,
  text: tw`text-greyScale-main hover:bg-greyScale-lighter`,
  "active-text": tw`bg-primary-light text-primary-main`,
  "light-grey": tw`bg-greyScale-lighter text-greyScale-main hover:text-greyScale-light`,
  secondary: tw`bg-secondary-main text-white hover:translate-y-[1px]`,
  "secondary-light": tw`bg-secondary-light text-secondary-dark hover:translate-y-[1px]`,
  outlined: tw`border border-dotted border-greyScale-main text-greyScale-main hover:translate-y-[1px]`,
  "blue-outline": tw`border border-solid border-primary-main text-primary-main hover:translate-y-[1px] justify-start`,
};

const sizes = {
  xlg: tw`py-small px-xx-large`,
  lg: tw`py-x-small px-xx-large`,
  med: tw`py-x-small px-x-large`,
  medium: tw`px-x-large py-small`,
};
const useButtonStyles = () => {
  const buttonWrapper = (
    disabled: boolean,
    variant: keyof typeof variants,
    size: keyof typeof sizes
  ) => css`
    ${tw`inline-flex items-center justify-center font-bold transition-all duration-300 ease-in rounded-small text-medium`}
    ${variants[variant]}
    ${sizes[size]}
  `;
  return {
    buttonWrapper,
    buttonContent: css`
      ${tw`flex items-center font-bold `}
    `,
    buttonText: css`
      ${tw`mx-small`}
    `,
  };
};

const Button: FC<Props> = ({
  variant,
  size,
  disabled,
  text,
  icon,
  start,
  status,
  ...rest
}) => {
  const styles = useButtonStyles();
  console.log(status, text);
  return (
    <button css={styles.buttonWrapper(disabled, variant, size!)} {...rest}>
      <span css={styles.buttonContent}>
        {start === true && icon}{" "}
        <p css={styles.buttonText}>
          {status === ResponseStatus.LOADING ? <Clip /> : text}
        </p>
        {start === false && icon}
      </span>
    </button>
  );
};

export default Button;
