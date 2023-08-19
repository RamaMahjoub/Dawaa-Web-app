import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./constant";
import RootLayout from "../Layout/RootLayout";
import { lazy } from "react";
import OutgoingReturnOrders from "../pages/OutgoingOrders/OutgoingReturnOrders/OutgoingReturnOrders";
import OutgoingLayout from "../pages/OutgoingOrders/OutgoingLayout";
import AuthGuard from "./AuthGuard";

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
const Invoices = lazy(() => import("../pages/Invoices/Invoices"));
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
      <Route element={<AuthGuard element={<RootLayout />} />}>
        <Route
          path={routes.ALL_STORES}
          element={<AuthGuard element={<AllStores />} />}
        />
        <Route
          path={`${routes.ALL_STORES}/:storeId`}
          element={<AuthGuard element={<StoreDetails />} />}
        />
        <Route
          path={routes.TRANSFER_MEDICINES}
          element={<AuthGuard element={<TransferMedicines />} />}
        />
        <Route
          path={routes.ALL_MEDICINES}
          element={<AuthGuard element={<AllMedicines />} />}
        />
        <Route
          path={routes.STORE_MEDICINES}
          element={<AuthGuard element={<StoreMedicines />} />}
        />
        <Route
          path={`${routes.ALL_MEDICINES}/:medicineId`}
          element={<AuthGuard element={<MedicineDetails />} />}
        />
        <Route
          path={routes.REPORT_MEDICINE}
          element={<AuthGuard element={<ReportAMedicine />} />}
        />
        <Route
          path={routes.SUPPLIERS}
          element={<AuthGuard element={<Suppliers />} />}
        />
        <Route
          path={`${routes.SUPPLIERS}/:supplierId`}
          element={<AuthGuard element={<SupplierDetails />} />}
        />
        <Route
          path={`${routes.SUPPLIERS}/:supplierId/${routes.SEND_ORDER}`}
          element={<AuthGuard element={<SendOrder />} />}
        />
        <Route
          path={`${routes.PURCHASE_ORDERS}`}
          element={<AuthGuard element={<PurchaseOrders />} />}
        />
        <Route
          path={`${routes.RETURN_ORDERS}`}
          element={<AuthGuard element={<ReturnOrders />} />}
        />
        <Route
          path={`${routes.PURCHASE_ORDERS}/:orderId`}
          element={<AuthGuard element={<OrderDetails />} />}
        />
        <Route element={<OutgoingLayout />}>
          <Route
            path={routes.OUTGOING_ORDERS}
            element={<AuthGuard element={<OutgoingOrders />} />}
          />
          <Route
            path={routes.OUTGOING_RETURN_ORDERS}
            element={<AuthGuard element={<OutgoingReturnOrders />} />}
          />
        </Route>
        <Route
          path={`${routes.OUTGOING_ORDERS}/:orderId`}
          element={<AuthGuard element={<OutgoingOrderDetails />} />}
        />
        <Route
          path={routes.EXPRESS_ORDERS}
          element={<AuthGuard element={<ExpressOrders />} />}
        />
        <Route
          path={routes.INVOICES}
          element={<AuthGuard element={<Invoices />} />}
        />
        <Route
          path={routes.ANALYTICS}
          element={<AuthGuard element={<Analytics />} />}
        />
        <Route
          path={routes.SETTINGS}
          element={<AuthGuard element={<Settings />} />}
        />
      </Route>
      <Route path={routes.REGISTER} element={<Register />} />
      <Route path={routes.CONFIRM} element={<ConfirmEmail />} />
      <Route
        path={routes.REGISTERION_PENDING}
        element={<AuthGuard element={<RegesterionPending />} />}
      />
      <Route
        path={routes.REGISTER_DETAILS}
        element={<AuthGuard element={<RegisterDetails />} />}
      />
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
