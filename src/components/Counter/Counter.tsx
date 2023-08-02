/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useState } from "react";
import { DashLg, PlusLg } from "react-bootstrap-icons";
import tw from "twin.macro";

const useCounterStyles = () => {
  return {
    counter: css`
      ${tw`inline-flex font-bold text-large gap-4 select-none bg-secondary-light text-secondary-dark justify-center items-center px-large py-x-small rounded-small`}
    `,
  };
};

interface Props {
  max?: number;
}
const Counter: FC<Props> = ({ max }) => {
  const styles = useCounterStyles();
  const [cnt, setCnt] = useState<number>(1);
  const increase = () => {
    if (max && cnt < max) setCnt((pre) => pre + 1);
    else if (max === undefined) setCnt((pre) => pre + 1);
  };
  const decrease = () => {
    if (cnt > 1) setCnt((pre) => pre - 1);
  };
  return (
    <div css={styles.counter}>
      <PlusLg className="cursor-pointer" onClick={increase} />
      {max !== undefined ? `${max} / ${Math.min(max, cnt)}` : cnt}
      <DashLg className="cursor-pointer" onClick={decrease} />
    </div>
  );
};

export default Counter;
