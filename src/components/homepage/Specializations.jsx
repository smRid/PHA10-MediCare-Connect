import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Baby,
  Bone,
  Brain,
  CircleDot,
  Cross,
  Eye,
  Flower2,
  HeartPulse,
  Microscope,
  Pill,
  Radar,
  Ribbon,
  ScanLine,
  Sparkles,
  Stethoscope,
  Thermometer,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const items = [
  {
    label: "General Medicine",
    icon: Stethoscope,
    text: "Primary care and everyday health",
  },
  {
    label: "Cardiology",
    icon: HeartPulse,
    text: "Heart health and circulation care",
  },
  {
    label: "Dermatology",
    icon: Sparkles,
    text: "Skin, allergy, and cosmetic care",
  },
  {
    label: "Endocrinology",
    icon: CircleDot,
    text: "Diabetes, thyroid, and hormone care",
  },
  {
    label: "Gastroenterology",
    icon: Thermometer,
    text: "Digestive health and stomach care",
  },
  {
    label: "Neurology",
    icon: Brain,
    text: "Brain, nerves, and rehab support",
  },
  {
    label: "Obstetrics & Gynecology",
    icon: Flower2,
    text: "Women's health and maternity care",
  },
  {
    label: "Oncology",
    icon: Ribbon,
    text: "Cancer screening and treatment plans",
  },
  {
    label: "Ophthalmology",
    icon: Eye,
    text: "Vision, eye exams, and surgery care",
  },
  {
    label: "Orthopedics",
    icon: Bone,
    text: "Bones, joints, and mobility care",
  },
  {
    label: "Pediatrics",
    icon: Baby,
    text: "Child-friendly family healthcare",
  },
  {
    label: "Psychiatry",
    icon: Brain,
    text: "Mental health and therapy support",
  },
  {
    label: "Pulmonology",
    icon: Activity,
    text: "Lung, asthma, and breathing care",
  },
  {
    label: "Radiology",
    icon: ScanLine,
    text: "Imaging, scans, and diagnostics",
  },
  {
    label: "Urology",
    icon: Pill,
    text: "Urinary and kidney health care",
  },
  {
    label: "Diagnostics",
    icon: Microscope,
    text: "Lab tests and clinical screening",
  },
  {
    label: "Preventive Care",
    icon: Radar,
    text: "Checkups, vaccines, and wellness",
  },
  {
    label: "Emergency",
    icon: Cross,
    text: "Fast triage and urgent support",
  },
];

export default function Specializations() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
      {/* Subtle section glow separator */}
      <div className="absolute left-1/2 top-0 h-[400px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Specializations"
            title="Browse by the care you need"
            description="Choose the right department quickly, from primary care to advanced diagnostics."
            className="flex-1"
          />
          <Link
            href="/find-doctors"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted hover:text-primary hover:border-primary/30"
          >
            View all doctors
            <ArrowRight className="size-4" />
          </Link>
        </div>
        
        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map(({ icon: Icon, label, text }) => (
            <Link
              key={label}
              href={`/find-doctors?specialization=${encodeURIComponent(label)}`}
              className="group block break-inside-avoid relative overflow-hidden rounded-2xl border border-border/50 glass-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/15"
            >
              {/* Decorative Internal Glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              
              <div className="relative z-10 flex items-start gap-5">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
                  <Icon className="size-6 transition-transform duration-300 group-hover:rotate-12" />
                </span>
                <div className="pt-1">
                  <h3 className="font-heading text-lg font-extrabold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
