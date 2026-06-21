"use client";

import { Mail, MapPin, PhoneCall } from "lucide-react";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ContactPage() {
  const submit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success("Message received. Our care team will respond soon.");
  };

  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Need help finding the right care?"
            description="Send a message, call the emergency hotline, or reach our appointment team."
          />
          <div className="mt-8 grid gap-4">
            {[
              {
                icon: PhoneCall,
                label: "Emergency hotline",
                value: "+1 800 555 CARE",
              },
              {
                icon: Mail,
                label: "Support email",
                value: "support@medicareconnect.test",
              },
              {
                icon: MapPin,
                label: "Care hub",
                value: "42 Wellness Ave, New York, NY",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex gap-4 rounded-lg border border-border bg-card p-4"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="grid gap-4 rounded-lg border border-border bg-card p-5 shadow-lg shadow-primary/5"
        >
          <Input name="name" label="Name" placeholder="Your name" required />
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <Input
            name="subject"
            label="Subject"
            placeholder="Appointment support"
            required
          />
          <Textarea
            name="message"
            label="Message"
            placeholder="How can we help?"
            required
          />
          <Button type="submit" size="lg">
            Send Message
          </Button>
        </form>
      </section>
    </main>
  );
}
