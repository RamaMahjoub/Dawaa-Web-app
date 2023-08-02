import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <ClipLoader
      color={"ffffff"}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;
