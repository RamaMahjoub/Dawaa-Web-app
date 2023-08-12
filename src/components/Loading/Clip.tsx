import { ClipLoader } from "react-spinners";

const Clip = () => {
  return (
    <ClipLoader
      color={"ffffff"}
      size={15}
      aria-label="Clip Spinner"
      data-testid="loader"
    />
  );
};

export default Clip;
