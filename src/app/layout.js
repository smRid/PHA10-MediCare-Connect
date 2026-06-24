import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const themeInitScript =
  '(function(){try{var key="medicare_theme";var saved=localStorage.getItem(key);var theme=saved==="dark"||saved==="light"?saved:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var root=document.documentElement;root.setAttribute("data-theme",theme);root.classList.toggle("dark",theme==="dark");root.classList.toggle("light",theme==="light");root.style.colorScheme=theme;}catch(e){}})();';

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
    <html lang="en" data-theme="light" className="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
