import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata = {
  applicationName: "MediCare Connect",
  title: {
    default: "MediCare Connect - Healthcare Appointments",
    template: "%s | MediCare Connect",
  },
  description:
    "Book doctors, manage appointments, prescriptions, payments, and healthcare operations in one modern platform.",
  keywords: [
    "healthcare",
    "hospital appointment",
    "doctor booking",
    "medical records",
    "MediCare Connect",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
