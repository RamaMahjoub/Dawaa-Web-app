import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IDropdownContext {
  open: boolean;
  handleOpen: () => void;
  changeableTitle: string;
  handleChangeTitle: (newTitle: string) => void;
  handleSelectValue: (newVal: string) => void;
  selectedValue: string;
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
  selectedValue: "",
  handleSelectValue: (newVal: string) => {},
});

export const DropdownContextMap = new Map();

export const DropdownProvider: FC<Props> = ({ title, children }) => {
  // Define context state and functions
  const [open, setOpen] = useState<boolean>(false);
  const [changeableTitle, setTitle] = useState<string>(title);
  const [selectedValue, setSelectedVal] = useState<string>(title);

  const handleOpen = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);
  const handleChangeTitle = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  const handleSelectValue = useCallback((newValue: string) => {
    setSelectedVal(newValue);
  }, []);

  return (
    // Provide the context values to the children components
    <DropdownContext.Provider
      value={{
        open,
        changeableTitle,
        selectedValue,
        handleOpen,
        handleChangeTitle,
        handleSelectValue,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
