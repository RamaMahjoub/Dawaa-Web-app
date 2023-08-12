/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useState } from "react";
import { DashLg, PlusLg } from "react-bootstrap-icons";
import tw from "twin.macro";
import TextField from "../TextField/TextField";

const useCounterStyles = () => {
  return {
    counter: css`
      ${tw`inline-flex items-center justify-center gap-4 font-bold select-none text-large bg-secondary-light text-secondary-dark px-large py-x-small rounded-small`}
    `,
  };
};

interface Props {
  max?: number;
  quantity?: number;
  onChange?: (value: number) => void;
}
const Counter: FC<Props> = ({ max, quantity, onChange }) => {
  const styles = useCounterStyles();
  const [inputVisible, setInputVisible] = useState<boolean>(false);

  const increase = () => {
    if (max && quantity! < max && onChange !== undefined)
      onChange(quantity! + 1);
    else if (max === undefined && onChange !== undefined)
      onChange(quantity! + 1);
  };
  const decrease = () => {
    if (quantity! > 1 && onChange !== undefined) onChange(quantity! - 1);
  };
  return (
    <div css={styles.counter}>
      <PlusLg className="cursor-pointer" onClick={increase} />
      {inputVisible ? (
        <TextField
          inputSize="small"
          autoFocus
          value={quantity}
          onBlur={() => setInputVisible(false)}
          onChange={(e) =>
            e.target.value === ""
              ? onChange !== undefined && onChange(quantity!)
              : onChange !== undefined && onChange(parseInt(e.target.value, 10))
          }
        />
      ) : (
        <span
          onClick={() => setInputVisible(true)}
          onFocus={() => setInputVisible(true)}
        >
          {max !== undefined
            ? `${max} / ${Math.min(max, quantity!)}`
            : quantity!}
        </span>
      )}
      <DashLg className="cursor-pointer" onClick={decrease} />
    </div>
  );
};

export default Counter;
