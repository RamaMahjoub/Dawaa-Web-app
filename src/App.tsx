import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Suspense } from "react";
import Beat from "./components/Loading/Beat";

function App() {
  return (
    <div className="flex gap-5 font-Markazi">
      <Suspense fallback={<Beat />}>
        
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
