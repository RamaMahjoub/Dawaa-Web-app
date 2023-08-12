import { Bag, CapsulePill, ShopWindow } from "react-bootstrap-icons";
import { routes } from "../router/constant";
import { Data } from "./types";

export const subMenus: Array<Data> = [
  {
    name: "المخازن",
    pathname: "stores",
    icon: ShopWindow,
    menus: [
      {
        name: "نقل أدوية",
        route: routes.TRANSFER_MEDICINES,
      },
      { name: "جميع المخازن", route: routes.ALL_STORES },
    ],
  },
  {
    name: "الأدوية",
    pathname: "medicines",
    icon: CapsulePill,
    menus: [
      {
        name: "إبلاغ عن دواء",
        route: routes.REPORT_MEDICINE,
      },
      {
        name: "جميع الأدوية",
        route: routes.ALL_MEDICINES,
      },
    ],
  },
  {
    name: "الطلبات",
    pathname: "orders",
    icon: Bag,
    menus: [
      {
        name: "الطلبات الواردة",
        route: routes.PURCHASE_ORDERS,
      },
      {
        name: "الطلبات الصادرة",
        route: routes.OUTGOING_ORDERS,
      },
      {
        name: "الطلبات السريعة",
        route: routes.EXPRESS_ORDERS,
      },
      {
        name: "الفواتير",
        route: routes.INVOICES,
      },
    ],
  },
];
