import {
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
    <section className="bg-card/60 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="Specializations"
          title="Browse by the care you need"
          description="Choose the right department quickly, from primary care to advanced diagnostics."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, label, text }) => (
            <article
              key={label}
              className="group rounded-lg border border-border bg-background p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold">{label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
