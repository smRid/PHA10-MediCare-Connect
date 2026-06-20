import { apiFetch, queryString } from "@/lib/api/base";

export const getDoctors = (params = {}) => {
  return apiFetch(`/doctors${queryString(params)}`, { cache: "no-store" });
};

export const getDoctorById = (id) => {
  return apiFetch(`/doctors/${id}`, { cache: "no-store" });
};

export const getStats = () => {
  return apiFetch("/stats", { cache: "no-store" });
};

export const getReviews = (params = {}) => {
  return apiFetch(`/reviews${queryString(params)}`, { cache: "no-store" });
};

export const getAppointments = (token) => {
  return apiFetch("/appointments", { token, cache: "no-store" });
};

export const getPayments = (token) => {
  return apiFetch("/payments", { token, cache: "no-store" });
};

export const getPrescriptions = (token) => {
  return apiFetch("/prescriptions", { token, cache: "no-store" });
};
