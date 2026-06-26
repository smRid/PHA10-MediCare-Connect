import {
  Activity,
  BarChart3,
  CalendarClock,
  ClipboardPlus,
  CreditCard,
  FileHeart,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserCog,
  Users,
} from "lucide-react";

export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "Find Doctors", href: "/find-doctors" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const nav = {
  patient: [
    {
      type: "link",
      label: "Overview",
      href: "/dashboard/patient",
      icon: LayoutDashboard,
    },
    {
      type: "link",
      label: "My Appointments",
      href: "/dashboard/patient/appointments",
      icon: CalendarClock,
    },
    {
      type: "link",
      label: "Payment History",
      href: "/dashboard/patient/payments",
      icon: CreditCard,
    },
    {
      type: "link",
      label: "My Reviews",
      href: "/dashboard/patient/reviews",
      icon: MessageSquareText,
    },
  ],
  doctor: [
    {
      type: "link",
      label: "Overview",
      href: "/dashboard/doctor",
      icon: LayoutDashboard,
    },
    {
      type: "link",
      label: "Manage Schedule",
      href: "/dashboard/doctor/schedule",
      icon: CalendarClock,
    },
    {
      type: "link",
      label: "Appointment Requests",
      href: "/dashboard/doctor/appointments",
      icon: ClipboardPlus,
    },
    {
      type: "link",
      label: "Prescriptions",
      href: "/dashboard/doctor/prescriptions",
      icon: FileHeart,
    },
  ],
  admin: [
    {
      type: "link",
      label: "Overview",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      type: "link",
      label: "Manage Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      type: "link",
      label: "Manage Doctors",
      href: "/dashboard/admin/doctors",
      icon: ShieldCheck,
    },
    {
      type: "link",
      label: "Appointments",
      href: "/dashboard/admin/appointments",
      icon: Activity,
    },
    {
      type: "link",
      label: "Payments",
      href: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      type: "link",
      label: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
  ],
};

export function getNavByRole(role) {
  return nav[role] || nav.patient;
}
