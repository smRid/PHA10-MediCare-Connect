import { Inter, Sora } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const themeInitScript =
  '(function(){try{var key="medicare_theme";var saved=localStorage.getItem(key);var theme=saved==="dark"||saved==="light"?saved:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var root=document.documentElement;root.setAttribute("data-theme",theme);root.classList.toggle("dark",theme==="dark");root.classList.toggle("light",theme==="light");root.style.colorScheme=theme;}catch(e){}})();';

export const metadata = {
  metadataBase: new URL("https://medicareconnectweb.vercel.app"),
  applicationName: "MediCare Connect",
  title: {
    default: "MediCare Connect | Find & Book Top-Rated Doctors Instantly",
    template: "%s | MediCare Connect",
  },
  description:
    "The ultimate healthcare management platform. Book appointments with top-rated specialists, manage digital prescriptions, and securely pay for medical consultations online.",
  keywords: [
    "find doctors online",
    "book doctor appointment",
    "healthcare management platform",
    "online medical consultations",
    "digital prescriptions",
    "telehealth platform",
    "medical specialists near me",
    "MediCare Connect",
  ],
  authors: [{ name: "MediCare Connect Team" }],
  creator: "MediCare Connect",
  publisher: "MediCare Connect",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medicareconnectweb.vercel.app",
    title: "MediCare Connect | Find & Book Top-Rated Doctors Instantly",
    description:
      "The ultimate healthcare management platform. Book appointments with top-rated specialists, manage digital prescriptions, and securely pay for medical consultations online.",
    siteName: "MediCare Connect",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "MediCare Connect Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediCare Connect | Find & Book Top-Rated Doctors Instantly",
    description:
      "The ultimate healthcare management platform. Book appointments with top-rated specialists, manage digital prescriptions, and securely pay for medical consultations online.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={`light ${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
