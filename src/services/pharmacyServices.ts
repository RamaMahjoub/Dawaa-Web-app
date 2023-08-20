import { protectedAxios } from "./axios";

const getAllPharmacies = (page: string, limit: string) => {
  return protectedAxios.get<any>(
    `/pharmacy/warehouse?limit=${limit}&page=${page}`
  );
};

const PharmacyService = {
  getAllPharmacies,
};

export default PharmacyService;
