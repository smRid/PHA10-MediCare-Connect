import {
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  TimerReset,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata = {
  title: "About Us",
};

const values = [
  {
    icon: TimerReset,
    title: "Less waiting",
    text: "Patients can compare doctors, pick available slots, and keep appointment status visible.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted care",
    text: "Doctor verification, secure APIs, and role-based access keep the platform accountable.",
  },
  {
    icon: Stethoscope,
    title: "Clinical flow",
    text: "Doctors manage schedules, appointment decisions, prescriptions, and profile updates.",
  },
  {
    icon: HeartHandshake,
    title: "Connected teams",
    text: "Admins can oversee users, payments, appointments, doctor performance, and reports.",
  },
];

export default function AboutPage() {
  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="About MediCare"
            title="A calmer operating system for modern healthcare."
            description="MediCare Connect replaces fragmented paperwork with one coordinated journey for patients, doctors, and administrators."
          />
          <p className="mt-6 text-muted-foreground">
            The platform is built around practical healthcare moments: finding a
            specialist, confirming a paid appointment, reviewing care, managing
            prescriptions, and helping hospital teams make better decisions from
            clean dashboards.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-lg border border-border bg-card">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
            alt="Healthcare team reviewing patient care on tablets"
            className="h-[420px] w-full object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-lg bg-background/85 p-4 backdrop-blur">
            <p className="font-heading text-xl font-bold">
              From appointment to aftercare, every step stays visible.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-lg border border-border bg-card p-5">
            <Icon className="mb-4 size-7 text-primary" />
            <h3 className="font-heading text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
