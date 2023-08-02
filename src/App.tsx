import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Suspense } from "react";

function App() {
  return (
    <div className="font-Markazi flex gap-5">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
