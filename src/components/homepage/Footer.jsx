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
    <footer className="border-t border-border bg-card/80 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_1fr_0.7fr]">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            A healthcare management platform for appointments, payments,
            prescriptions, reviews, and operational dashboards.
          </p>
        </div>

        <div>
          <h3 className="font-heading font-bold">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <Link href="/find-doctors" className="hover:text-primary">
              Find Doctors
            </Link>
            <Link href="/about" className="hover:text-primary">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact Us
            </Link>
            <Link href="/login" className="hover:text-primary">
              Login
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold">Contact Information</h3>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <PhoneCall className="size-4 text-primary" /> +1 800 555 CARE
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> support@medicareconnect.test
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> 42 Wellness Ave, New York
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold">Emergency Hotline</h3>
          <p className="mt-4 rounded-lg bg-primary/10 p-3 font-heading text-xl font-extrabold text-primary">
            911 / +1 800 CARE
          </p>
          <div className="mt-4 flex gap-2">
            {[Globe2, MessageCircle, Share2].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="Social media link"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-border pt-5 text-sm text-muted-foreground">
        Copyright 2026 MediCare Connect. All rights reserved.
      </p>
    </footer>
  );
}
