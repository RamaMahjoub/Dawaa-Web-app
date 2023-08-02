import { routes } from "../router/constant";

export const HeaderTitle = (path: string) => {
  if (path === `/${routes.REGISTER}`) {
    return "التسجيل للحصول على حساب";
  } else if (path === `/${routes.LOGIN}`) {
    return "تسجيل الدخول إلى حسابك";
  } else if (path === `/${routes.REGISTER_DETAILS}`) {
    return "المعلومات الشخصية";
  } else if (path === `/${routes.REGISTERION_PENDING}`) {
    return "مراجعة المعلومات الشخصية";
  } else if (path === `/${routes.CONFIRM}`) {
    return "تأكيد الحساب";
  } else if (path === `/${routes.FORGOT_PASSWORD}`) {
    return "إعادة تعيين كلمة المرور";
  } else if (
    path === `/${routes.ALL_STORES}` ||
    path.includes(`/${routes.ALL_STORES}`)
  ) {
    return "جميع المخازن";
  } else if (
    path === `/${routes.STORE_MEDICINES}` 
  ) {
    return "تخزين أدوية";
  }else if (
    path === `/${routes.ALL_MEDICINES}` ||
    path.includes(`/${routes.ALL_MEDICINES}`)
  ) {
    return "جميع الأدوية";
  } else if (path.includes(`/${routes.SEND_ORDER}`)) {
    return "إرسال طلب";
  } else if (
    path === `/${routes.SUPPLIERS}` ||
    path.includes(`/${routes.SUPPLIERS}`)
  ) {
    return "الشركات المورّدة للأدوية";
  } else if (path === `/${routes.TRANSFER_MEDICINES}`) {
    return "نقل أدوية";
  } else if (path === `/${routes.REPORT_MEDICINE}`) {
    return "إبلاغ عن دواء مضروب";
  } else if (
    path === `/${routes.PURCHASE_ORDERS}` ||
    path === `/${routes.RETURN_ORDERS}` ||
    path.includes(`/${routes.PURCHASE_ORDERS}`)
  ) {
    return "الطلبات الواردة";
  } else if (
    path === `/${routes.OUTGOING_ORDERS}` ||
    path.includes(`/${routes.OUTGOING_ORDERS}`)
  ) {
    return "الطلبات الصادرة";
  } else if (path === `/${routes.EXPRESS_ORDERS}`) {
    return "الطلبات السريعة";
  } else if (path === `/${routes.ANALYTICS}`) {
    return "الإحصائيات";
  } else if (path === `/${routes.REPORTS}`) {
    return "الإبلاغات";
  } else if (path === `/${routes.SETTINGS}`) {
    return "الإعدادات";
  }
};
