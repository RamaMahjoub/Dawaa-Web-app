import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import { ToastContainer, Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <ToastContainer
        transition={Flip}
        autoClose={8000}
        hideProgressBar={true}
        theme="colored"
        position={toast.POSITION.BOTTOM_CENTER}
      /> */}
    <App />
  </Provider>
  // </React.StrictMode>
);
