import { BeatLoader } from "react-spinners";

const Beat = () => {
  return (
    <div className="flex items-start justify-center">
      <BeatLoader
        color={"#94A3B8"}
        size={5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Beat;
