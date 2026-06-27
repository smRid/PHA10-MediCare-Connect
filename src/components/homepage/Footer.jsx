import Link from "next/link";
import {
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Share2,
} from "lucide-react";
import BrandMark from "@/components/shared/BrandMark";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-background px-4 py-16 sm:px-6 lg:px-8">
      {/* Ambient Footer Glow */}
      <div className="absolute bottom-0 left-1/2 h-64 w-full max-w-5xl -translate-x-1/2 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_1fr_0.7fr]">
        <div>
          <BrandMark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A healthcare management platform for appointments, payments,
            prescriptions, reviews, and operational dashboards.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-foreground">Quick Links</h3>
          <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
            <Link href="/find-doctors" className="w-fit transition-colors hover:text-primary">
              Find Doctors
            </Link>
            <Link href="/about" className="w-fit transition-colors hover:text-primary">
              About Us
            </Link>
            <Link href="/contact" className="w-fit transition-colors hover:text-primary">
              Contact Us
            </Link>
            <Link href="/login" className="w-fit transition-colors hover:text-primary">
              Login
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-foreground">Contact Information</h3>
          <div className="mt-5 grid gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <PhoneCall className="size-4" />
              </span>
              +1 800 555
            </span>
            <span className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="size-4" />
              </span>
              support@medicareconnect.test
            </span>
            <span className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-4" />
              </span>
              42 Wellness Ave, New York
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-foreground">Emergency Hotline</h3>
          <div className="mt-5 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-sky-500/5 p-4 ring-1 ring-primary/20 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <p className="font-heading text-xl font-extrabold text-primary">
              +1 800 354-8138
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            {[Globe2, MessageCircle, Share2].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="Social media link"
                className="group flex size-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/20"
              >
                <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative z-10 mx-auto mt-16 max-w-7xl border-t border-border/50 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-sm text-muted-foreground">
        <p>Copyright &copy; 2026 MediCare Connect. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
