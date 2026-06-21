import { demoAppointments } from "@/lib/demo-data";

export const fallbackDoctorAppointments = demoAppointments.map((item) => ({
  ...item,
  patientName: item.patientName || "Ariana Rahman",
}));

export const fallbackDoctorProfile = {
  _id: "demo-cardio",
  doctorName: "Dr. Mason Lee",
  specialization: "Cardiology",
  qualifications: "MBBS, MD Cardiology",
  experience: 13,
  consultationFee: 120,
  hospitalName: "Northline Heart Institute",
  profileImage:
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
  availableDays: ["Monday", "Wednesday", "Friday"],
  availableSlots: ["09:00 AM", "11:30 AM", "03:00 PM"],
  verificationStatus: "verified",
  ratingAverage: 4.9,
  reviewCount: 210,
};
