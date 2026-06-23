import { apiFetch, queryString } from "@/lib/api/base";

function collectionFromPayload(payload, key) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.[key])) return payload[key];
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.[key])) return payload.data[key];
  if (Array.isArray(payload?.result)) return payload.result;
  if (Array.isArray(payload?.result?.[key])) return payload.result[key];
  return [];
}

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
  return apiFetch(`/reviews${queryString(params)}`, {
    cache: "no-store",
  }).then((payload) => collectionFromPayload(payload, "reviews"));
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
