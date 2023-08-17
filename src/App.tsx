import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Suspense } from "react";
import Beat from "./components/Loading/Beat";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
function App() {
  const theme = createTheme({
    direction: "rtl",
  });
  return (
    <div className="flex gap-5 font-Markazi">
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Beat />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
