/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  FC,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import tw from "twin.macro";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputSize: string;
  variant?: string;
  padding?: string;
  helperText?: string;
}

export const useTextFieldStyles = () => {
  const icon = css`
    ${tw`absolute flex items-center justify-center transition-colors duration-300 ease-in -translate-y-1/2 top-2/4 rounded-larg text-greyScale-main`}
  `;
  return {
    field: (size: string) => css`
      ${tw`relative text-greyScale-main text-medium`}
      ${size === "x-large"
        ? css`
            ${tw`w-full`}
          `
        : size === "large"
        ? css`
            width: 80%;
          `
        : size === "medium"
        ? css`
            width: 60%;
          `
        : size === "small" &&
          css`
            width: 40px;
            height: 40px;
            flex: 1;
          `}
    `,
    inputWrapper: css`
      ${tw`relative w-full`}
    `,
    iconStart: css`
      ${icon}
      ${tw`right-large`}
    `,
    iconEnd: css`
      ${icon}
      ${tw`cursor-pointer left-large hover:bg-greyScale-lighter`}
    `,
    textinput: (
      startPadding: boolean,
      endPadding: boolean,
      helperText: boolean,
      variant: string = "outlined",
      size: string
    ) => css`
      ${tw`w-full outline-none p-small rounded-small text-greyScale-main`}
      ${size === "small" && tw`text-center`}
      ${(size === "medium" || size === "large") && tw`py-x-small px-x-large`}
      ${variant === "outlined"
        ? css`
            ${tw`transition-colors duration-300 ease-in border border-solid`}
          `
        : variant === "fill" &&
          css`
            ${tw`bg-greyScale-lighter`}
          `}
      ${helperText
        ? css`
            ${tw`border-red-main`}
          `
        : css`
            ${tw`border-greyScale-main hover:border-primary-main focus:border-primary-main`}
          `}

      ${startPadding &&
      css`
        ${tw`pr-xx-large`}
      `}
      ${endPadding &&
      css`
        ${tw`pl-xx-large`}
      `}
    `,
    label: (startPadding: boolean, helperText: boolean) => css`
      ${tw`absolute bg-white pointer-events-none text-greyScale-main px-x-small`}
      ${helperText
        ? css`
            top: 15%;
          `
        : css`
            ${tw`top-1/4`}
          `}
      ${startPadding
        ? css`
            ${tw`right-xx-large`}
          `
        : css`
            ${tw`right-large`}
          `}
    `,
    labelUp: css`
      ${tw`right-medium transition-transform duration-300 ease-in origin-top-right -translate-y-[105%] scale-[0.9]`}
    `,
    helperText: css`
      ${tw`text-red-main text-small`};
    `,
  };
};
const TextField: FC<Props> = forwardRef(
  (
    {
      type = "text",
      label,
      startIcon,
      endIcon,
      inputSize,
      variant,
      helperText,
      padding,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const styles = useTextFieldStyles();
    const [focus, setFocus] = useState<boolean>(false);
    const handleFocus = () => {
      setFocus((pre) => !pre);
    };
    return (
      <div css={styles.field(inputSize)} ref={ref}>
        <div css={styles.inputWrapper}>
          {startIcon && <div css={styles.iconStart}>{startIcon}</div>}
          <input
            css={styles.textinput(
              !!startIcon,
              !!endIcon,
              !!helperText,
              variant,
              inputSize
            )}
            type={type}
            onFocus={handleFocus}
            onBlur={handleFocus}
            spellCheck={false}
            autoComplete="off"
            {...rest}
          />
          {endIcon && <p css={styles.iconEnd}>{endIcon}</p>}
        </div>
        {helperText && <p css={styles.helperText}>{helperText}</p>}
        {label && (
          <label
            css={[
              styles.label(!!startIcon, !!helperText),
              (focus || rest.value !== "") && styles.labelUp,
            ]}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

export default TextField;
