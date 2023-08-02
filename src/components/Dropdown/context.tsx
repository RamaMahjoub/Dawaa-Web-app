import { FC, ReactNode, createContext, useCallback, useState } from "react";

interface IDropdownContext {
  open: boolean;
  handleOpen: () => void;
  changeableTitle: string;
  handleChangeTitle: (newTitle: string) => void;
}
interface Props {
  title: string;
  children: ReactNode;
}

export const DropdownContext = createContext<IDropdownContext>({
  open: false,
  handleOpen: () => {},
  changeableTitle: "",
  handleChangeTitle: (newTitle: string) => {},
});

export const DropdownProvider: FC<Props> = ({ title, children }) => {
  // Define context state and functions
  const [open, setOpen] = useState<boolean>(false);
  const [changeableTitle, setTitle] = useState<string>(title);

  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);
  const handleChangeTitle = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  return (
    // Provide the context values to the children components
    <DropdownContext.Provider
      value={{
        open,
        handleOpen,
        changeableTitle,
        handleChangeTitle,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
