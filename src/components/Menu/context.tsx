import { FC, ReactNode, createContext, useCallback, useState } from "react";

interface ISubMenuContext {
  selected: string;
  handleSelect: (val: string) => void;
}
interface Props {
  children: ReactNode;
}

export const SubMenuContext = createContext<ISubMenuContext>({
  selected: "",
  handleSelect: (val: string) => {},
});

export const SubMenuProvider: FC<Props> = ({ children }) => {
  // Define context state and functions
  const [selected, setselected] = useState<string>("");

  const handleSelect = useCallback((val: string) => {
    setselected(val);
  }, []);

  return (
    // Provide the context values to the children components
    <SubMenuContext.Provider
      value={{
        selected,
        handleSelect,
      }}
    >
      {children}
    </SubMenuContext.Provider>
  );
};
