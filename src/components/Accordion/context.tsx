import { FC, ReactNode, createContext, useCallback, useState } from "react";

interface IAccordionContext {
  open: boolean;
  handleOpen: () => void;
}
interface Props {
  children: ReactNode;
}

export const AccordionContext = createContext<IAccordionContext>({
  open: false,
  handleOpen: () => {},
});

export const AccordionProvider: FC<Props> = ({ children }) => {
  // Define context state and functions
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);

  return (
    // Provide the context values to the children components
    <AccordionContext.Provider
      value={{
        open,
        handleOpen,
      }}
    >
      {children}
    </AccordionContext.Provider>
  );
};
