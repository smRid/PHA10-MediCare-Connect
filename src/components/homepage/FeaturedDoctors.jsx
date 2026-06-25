"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDoctors } from "@/lib/api/healthcare";
import SectionHeading from "@/components/shared/SectionHeading";
import DoctorCard from "@/components/doctors/DoctorCard";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors({ page: 1, perPage: 3, sort: "rating" })
      .then((data) => setDoctors(data.doctors || []))
      .catch(() => setDoctors([]));
  }, []);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Doctors"
            title="Specialists patients trust first"
            description="Dynamic doctor cards show experience, specialization, consultation fee, and rating."
          />
          <Link
            href="/find-doctors"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            View all doctors
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}
