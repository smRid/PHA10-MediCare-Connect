import {
  CalendarCheck,
  FileHeart,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";
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
    <section className="relative overflow-hidden bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 medical-grid opacity-20 pointer-events-none" />
      <div className="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:pr-10"
        >
          <SectionHeading
            align="left"
            eyebrow="Why Choose MediCare Connect"
            title="Healthcare feels easier when every step stays connected."
            description="From finding a specialist to receiving a prescription, MediCare Connect keeps patients, doctors, and hospitals moving together."
          />
        </motion.div>
        
        <div className="grid gap-6 sm:grid-cols-2">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl glass-card border border-border/50 p-7 shadow-lg shadow-primary/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40"
            >
              {/* Decorative Internal Glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
                  <Icon className="size-6 transition-transform duration-300 group-hover:-rotate-12" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
