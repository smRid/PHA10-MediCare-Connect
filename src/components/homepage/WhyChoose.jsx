import {
  CalendarCheck,
  FileHeart,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const benefits = [
  {
    icon: CalendarCheck,
    title: "Faster appointment access",
    text: "Find available doctors, compare consultation fees, and book care without long phone queues.",
  },
  {
    icon: ShieldCheck,
    title: "Verified medical professionals",
    text: "Doctor profiles show qualifications, experience, hospitals, availability, and verification status.",
  },
  {
    icon: FileHeart,
    title: "Care records in one place",
    text: "Appointments, payment history, reviews, and prescriptions stay connected for each patient.",
  },
  {
    icon: Stethoscope,
    title: "Smoother doctor follow-up",
    text: "Doctors can manage schedules, handle requests, complete consultations, and share prescriptions.",
  },
];

export default function WhyChoose() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Why Choose MediCare Connect"
          title="Healthcare feels easier when every step stays connected."
          description="From finding a specialist to receiving a prescription, MediCare Connect keeps patients, doctors, and hospitals moving together."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-lg border border-border bg-card p-5">
              <Icon className="mb-4 size-7 text-primary" />
              <h3 className="font-heading text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
