import { protectedAxios } from "./axios";

const findInventoriesReports = (page: string, limit: string) => {
  return protectedAxios.get<any>(
    `/report-medicine/warehouse?limit=${limit}&page=${page}`
  );
};

const acceptInventoryReport = (id: string) => {
  return protectedAxios.patch<any>(`report-medicine/warehouse/accept/${id}`);
};

const rejectInventoryReport = (id: string) => {
  return protectedAxios.patch<any>(`/report-medicine/warehouse/reject/${id}`);
};

const ReportService = {
  findInventoriesReports,
  acceptInventoryReport,
  rejectInventoryReport,
};

export default ReportService;
