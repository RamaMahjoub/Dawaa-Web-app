import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Suspense } from "react";
import Beat from "./components/Loading/Beat";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import TokenExpired from "./components/TokenExpired";
import { useAppSelector } from "./hooks/useAppSelector";
import { isSessionExpired } from "./redux/authSlice";
function App() {
  const showSessionExpired = useAppSelector(isSessionExpired);
  const theme = createTheme({
    direction: "rtl",
  });
  return (
    <div className="flex gap-5 font-Markazi">
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Beat />}>
          <RouterProvider router={router} />
        </Suspense>
        {showSessionExpired && <TokenExpired />}
      </ThemeProvider>
    </div>
  );
}

export default App;
