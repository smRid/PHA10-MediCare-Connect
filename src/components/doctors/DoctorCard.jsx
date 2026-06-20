import Link from "next/link";
import { CalendarPlus, MapPin, Star } from "lucide-react";
import { currency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import StatusPill from "@/components/shared/StatusPill";

export default function DoctorCard({ doctor }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative h-60 overflow-hidden">
        <img
          src={
            doctor.profileImage ||
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80"
          }
          alt={doctor.doctorName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <StatusPill status={doctor.verificationStatus || "verified"} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-xl font-extrabold">
              {doctor.doctorName}
            </h3>
            <p className="mt-1 text-sm text-primary">{doctor.specialization}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            <Star className="size-3 fill-current" />
            {doctor.ratingAverage || "4.8"}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {doctor.bio || doctor.qualifications}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="blue">{doctor.experience}+ years</Badge>
          <Badge tone="green">{currency(doctor.consultationFee)}</Badge>
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          {doctor.hospitalName}
        </p>
        <Link
          href={`/doctors/${doctor._id}`}
          className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground transition hover:opacity-90"
        >
          <CalendarPlus className="size-4" />
          View and Book
        </Link>
      </div>
    </article>
  );
}
