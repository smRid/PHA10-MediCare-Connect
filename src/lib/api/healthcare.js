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

function dateOnly(value) {
  if (!value) return "";
  return String(value).slice(0, 10);
}

function personName(value, fallback = "Unknown") {
  if (!value) return fallback;
  if (typeof value === "string") return fallback;
  return value.name || value.doctorName || fallback;
}

export function normalizeUser(user) {
  if (!user) return user;
  return {
    ...user,
    _id: user._id || user.id,
    name: user.name || "Unknown",
  };
}

export function normalizeDoctor(doctor) {
  if (!doctor) return doctor;

  return {
    ...doctor,
    _id: doctor._id || doctor.id,
    doctorName: doctor.userProfile?.name ?? doctor.doctorName ?? doctor.name,
    hospitalName: doctor.hospitalName || doctor.hospital,
    profileImage: doctor.userProfile?.photo ?? doctor.profileImage ?? doctor.image,
    availableDays: doctor.availableDays || doctor.days || [],
    availableSlots: doctor.availableSlots || doctor.slots || [],
  };
}

export function normalizeAppointment(appointment) {
  if (!appointment) return appointment;
  const doctor = normalizeDoctor(appointment.doctor);
  const patient = appointment.patient;

  return {
    ...appointment,
    _id: appointment._id || appointment.id,
    doctor,
    patient,
    doctorId: doctor?._id || appointment.doctorId || appointment.doctor,
    patientId: patient?._id || appointment.patientId || appointment.patient,
    doctorName: personName(doctor, appointment.doctorName || "Doctor"),
    patientName: personName(patient, appointment.patientName || "Patient"),
    appointmentDate: appointment.appointmentDate || dateOnly(appointment.date),
    appointmentTime: appointment.appointmentTime || appointment.time,
    appointmentStatus: appointment.appointmentStatus || appointment.status,
  };
}

export function normalizeReview(review) {
  if (!review) return review;
  const doctor = normalizeDoctor(review.doctor);
  const patient = review.patient;

  return {
    ...review,
    _id: review._id || review.id,
    doctor,
    patient,
    doctorId: doctor?._id || review.doctorId || review.doctor,
    patientId: patient?._id || review.patientId || review.patient,
    doctorName: personName(doctor, review.doctorName || "Doctor"),
    patientName: personName(patient, review.patientName || "Patient"),
    reviewText: review.reviewText || review.comment,
  };
}

export function normalizePayment(payment) {
  if (!payment) return payment;
  const appointment = normalizeAppointment(payment.appointment);

  return {
    ...payment,
    _id: payment._id || payment.id,
    appointment,
    appointmentId: appointment?._id || payment.appointmentId || payment.appointment,
    paymentDate: payment.paymentDate || payment.paidAt || payment.createdAt,
  };
}

export function normalizePrescription(prescription) {
  if (!prescription) return prescription;
  const appointment = normalizeAppointment(prescription.appointment);

  return {
    ...prescription,
    _id: prescription._id || prescription.id,
    appointment,
    appointmentId:
      appointment?._id || prescription.appointmentId || prescription.appointment,
    patientName: personName(prescription.patient, prescription.patientName || "Patient"),
    doctorName: personName(prescription.doctor, prescription.doctorName || "Doctor"),
  };
}

export const getDoctors = (params = {}) => {
  return apiFetch(`/doctors${queryString(params)}`, { cache: "no-store" }).then(
    (payload) => ({
      ...payload,
      doctors: collectionFromPayload(payload, "doctors").map(normalizeDoctor),
    }),
  );
};

export const getDoctorById = (id) => {
  return apiFetch(`/doctors/${id}`, { cache: "no-store" }).then(normalizeDoctor);
};

export const getStats = () => {
  return apiFetch("/stats", { cache: "no-store" });
};

export const getReviews = (params = {}) => {
  return apiFetch(`/reviews${queryString(params)}`, {
    cache: "no-store",
  }).then((payload) => collectionFromPayload(payload, "reviews").map(normalizeReview));
};

export const getAppointments = (token) => {
  return apiFetch(`/appointments?_t=${Date.now()}`, { token, cache: "no-store" }).then((items) =>
    collectionFromPayload(items, "appointments").map(normalizeAppointment),
  );
};

export const getPayments = (token) => {
  return apiFetch(`/payments?_t=${Date.now()}`, { token, cache: "no-store" }).then((items) =>
    collectionFromPayload(items, "payments").map(normalizePayment),
  );
};

export const getPrescriptions = (token) => {
  return apiFetch("/prescriptions", { token, cache: "no-store" }).then((items) =>
    collectionFromPayload(items, "prescriptions").map(normalizePrescription),
  );
};

export const getUsers = (token) => {
  return apiFetch("/users", { token, cache: "no-store" }).then((items) =>
    collectionFromPayload(items, "users").map(normalizeUser),
  );
};

export const deleteUser = (id, token) => {
  return apiFetch(`/users/${id}`, { method: "DELETE", token });
};

export const updateUser = (id, payload, token) => {
  return apiFetch(`/users/${id}`, {
    method: "PATCH",
    token,
    body: payload,
  }).then(normalizeUser);
};

export const updateDoctorVerification = (id, status, token) => {
  return apiFetch(`/doctors/${id}/verification`, {
    method: "PATCH",
    token,
    body: { verificationStatus: status },
  }).then(normalizeDoctor);
};

export const getAnalytics = (token) => {
  return apiFetch("/analytics", { token, cache: "no-store" }).then((payload) => ({
    ...payload,
    topDoctors: collectionFromPayload(payload, "topDoctors").map(normalizeDoctor),
  }));
};

