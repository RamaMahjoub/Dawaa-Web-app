import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./constant";
import RootLayout from "../Layout/RootLayout";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const ConfirmEmail = lazy(() => import("../pages/Register/ConfirmEmail"));
const RegisterDetails = lazy(() => import("../pages/Register/RegisterDetails"));
const RegesterionPending = lazy(
  () => import("../pages/Register/RegesterionPending")
);
const ForgotPassword = lazy(() => import("../pages/Register/ForgotPassword"));
const StoreMedicines = lazy(
  () => import("../pages/AllMedicines/StoreMedicines")
);
const PageNotFound = lazy(() => import("../pages/PageNotFound/PageNotFound"));
const MedicineDetails = lazy(
  () => import("../pages/AllMedicines/MedicineDetails/MedicineDetails")
);
const PurchaseOrders = lazy(
  () => import("../pages/ReceivedOrders/PurchaseOrders")
);
const ReturnOrders = lazy(() => import("../pages/ReceivedOrders/ReturnOrders"));
const SendOrder = lazy(() => import("../pages/SendOrder/SendOrder"));
const OutgoingOrderDetails = lazy(
  () => import("../pages/OutgoingOrders/OrderDetails/OutgoingOrderDetails")
);
const SupplierDetails = lazy(
  () => import("../pages/Suppliers/SupplierDetails/SupplierDetails")
);
const OrderDetails = lazy(
  () => import("../pages/ReceivedOrders/OrderDetails/OrderDetails")
);
const StoreDetails = lazy(
  () => import("../pages/AllStores/StoreDetails/StoreDetails")
);
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Analytics = lazy(() => import("../pages/Analytics/Analytics"));
const ExpressOrders = lazy(
  () => import("../pages/ExpressOrders/ExpressOrders")
);
const Reports = lazy(() => import("../pages/Reports/Reports"));
const OutgoingOrders = lazy(
  () => import("../pages/OutgoingOrders/OutgoingOrders")
);
const ReportAMedicine = lazy(
  () => import("../pages/ReportAMedicine/ReportAMedicine")
);
const AllMedicines = lazy(() => import("../pages/AllMedicines/AllMedicines"));
const Suppliers = lazy(() => import("../pages/Suppliers/Suppliers"));
const TransferMedicines = lazy(
  () => import("../pages/TransferMedicine/TransferMedicines")
);
const AllStores = lazy(() => import("../pages/AllStores/AllStores"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route path={routes.ALL_STORES} element={<AllStores />} />
        <Route
          path={`${routes.ALL_STORES}/:storeId`}
          element={<StoreDetails />}
        />
        <Route
          path={routes.TRANSFER_MEDICINES}
          element={<TransferMedicines />}
        />
        <Route path={routes.ALL_MEDICINES} element={<AllMedicines />} />
        <Route path={routes.STORE_MEDICINES} element={<StoreMedicines />} />
        <Route
          path={`${routes.ALL_MEDICINES}/:medicineId`}
          element={<MedicineDetails />}
        />
        <Route path={routes.REPORT_MEDICINE} element={<ReportAMedicine />} />
        <Route path={routes.SUPPLIERS} element={<Suppliers />} />
        <Route
          path={`${routes.SUPPLIERS}/:supplierId`}
          element={<SupplierDetails />}
        />
        <Route
          path={`${routes.SUPPLIERS}/:supplierId/${routes.SEND_ORDER}`}
          element={<SendOrder />}
        />
        <Route
          path={`${routes.PURCHASE_ORDERS}`}
          element={<PurchaseOrders />}
        />
        <Route path={`${routes.RETURN_ORDERS}`} element={<ReturnOrders />} />
        <Route
          path={`${routes.PURCHASE_ORDERS}/:orderId`}
          element={<OrderDetails />}
        />
        <Route path={routes.OUTGOING_ORDERS} element={<OutgoingOrders />} />
        <Route
          path={`${routes.OUTGOING_ORDERS}/:orderId`}
          element={<OutgoingOrderDetails />}
        />
        <Route path={routes.EXPRESS_ORDERS} element={<ExpressOrders />} />
        <Route path={routes.REPORTS} element={<Reports />} />
        <Route path={routes.ANALYTICS} element={<Analytics />} />
        <Route path={routes.SETTINGS} element={<Settings />} />
      </Route>
      <Route path={routes.REGISTER} element={<Register />} />
      <Route path={routes.CONFIRM} element={<ConfirmEmail />} />
      <Route
        path={routes.REGISTERION_PENDING}
        element={<RegesterionPending />}
      />
      <Route path={routes.REGISTER_DETAILS} element={<RegisterDetails />} />
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
