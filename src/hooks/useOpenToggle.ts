import { useCallback, useState } from "react";

export const useOpenToggle = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);

  return {
    open,
    handleOpen,
  };
};
