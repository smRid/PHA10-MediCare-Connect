import Link from "next/link";
import { CalendarPlus, MapPin, Star } from "lucide-react";
import { currency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import StatusPill from "@/components/shared/StatusPill";

export default function DoctorCard({ doctor }) {
  return (
    <article className="group flex flex-col h-full overflow-hidden rounded-2xl glass-card border border-border/50 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/15 relative">
      {/* Decorative Glow */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/20 to-sky-500/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative h-60 shrink-0 pb-[1px] -mb-[1px] overflow-hidden bg-muted z-0 [clip-path:inset(0)]">
        <img
          src={
            doctor.profileImage ||
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80"
          }
          alt={doctor.doctorName}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
        />
        
        {/* Glassmorphic Gradient Overlays */}
        <div className="absolute -inset-1 bg-gradient-to-t from-background/95 via-background/10 to-transparent mix-blend-normal opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-1 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="absolute left-3 top-3 z-10">
          <div className="rounded-full bg-background/50 backdrop-blur-md p-1 shadow-sm border border-border/50 transition-transform duration-300 group-hover:scale-105">
            <StatusPill status={doctor.verificationStatus || "verified"} />
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-6 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-xl font-extrabold text-foreground group-hover:text-primary transition-colors duration-300">
              {doctor.doctorName}
            </h3>
            <p className="mt-1 text-sm font-semibold text-primary/80">{doctor.specialization}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
            <Star className="size-3 fill-current" />
            {doctor.ratingAverage || "4.8"}
          </span>
        </div>
        
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {doctor.bio || doctor.qualifications}
        </p>
        
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="blue">{doctor.experience}+ years exp</Badge>
          <Badge tone="green">{currency(doctor.consultationFee)}</Badge>
        </div>
        
        <div className="mt-auto pt-5">
          <p className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            <MapPin className="size-4 text-primary" />
            {doctor.hospitalName}
          </p>
          
          <Link
            href={`/doctors/${doctor._id}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
          >
            <CalendarPlus className="size-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            View and Book
          </Link>
        </div>
      </div>
    </article>
  );
}
