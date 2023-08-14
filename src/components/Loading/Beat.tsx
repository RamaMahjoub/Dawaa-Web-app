import { ForwardedRef, forwardRef } from "react";
import { BeatLoader } from "react-spinners";

const Beat = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="flex items-start justify-center" ref={ref}>
      <BeatLoader
        color={"#94A3B8"}
        size={5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
});

export default Beat;
