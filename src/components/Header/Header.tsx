/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import tw from "twin.macro";

export enum HeaderTypes {
  DISTRIPUTE = "distripute", // tow items in the left side
  ALL = "all", // one item in the left side
  FREE = "free", // no items in the left side
}
interface Props {
  title: ReactNode;
  action?: ReactNode;
  leftSpace: HeaderTypes;
}

const useStyles = () => {
  return {
    rightSide: css`
      ${tw`mx-large md:mx-0 flex items-center`}
    `,
    leftSide: (leftSpace: HeaderTypes) => css`
      ${leftSpace === HeaderTypes.DISTRIPUTE
        ? tw`flex w-8/12 lg:w-1/2 justify-between items-center`
        : leftSpace === HeaderTypes.ALL && tw`flex w-1/3 sm:w-3/6 lg:w-1/3 justify-center items-center`}
    `,
  };
};
const Header: FC<Props> = ({ title, action, leftSpace }) => {
  const styles = useStyles();
  return (
    <div className="header">
      <div css={styles.rightSide}>{title}</div>
      <div css={styles.leftSide(leftSpace)}>{action}</div>
    </div>
  );
};

export default Header;
