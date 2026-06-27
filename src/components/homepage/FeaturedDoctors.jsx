"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getDoctors } from "@/lib/api/healthcare";
import SectionHeading from "@/components/shared/SectionHeading";
import DoctorCard from "@/components/doctors/DoctorCard";

function DoctorCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm animate-pulse">
      <div className="h-60 bg-muted/60" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="w-full">
            <div className="h-6 w-3/4 rounded-md bg-muted" />
            <div className="mt-2 h-4 w-1/2 rounded-md bg-muted/60" />
          </div>
          <div className="h-6 w-12 shrink-0 rounded-full bg-muted" />
        </div>
        <div className="mt-5 space-y-2">
          <div className="h-4 w-full rounded-md bg-muted/50" />
          <div className="h-4 w-5/6 rounded-md bg-muted/50" />
        </div>
        <div className="mt-5 flex gap-2">
          <div className="h-6 w-20 rounded-full bg-muted" />
          <div className="h-6 w-16 rounded-full bg-muted" />
        </div>
        <div className="mt-6 flex items-center gap-2">
          <div className="size-4 rounded-full bg-muted" />
          <div className="h-4 w-1/2 rounded-md bg-muted" />
        </div>
        <div className="mt-6 h-10 w-full rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDoctors({ page: 1, perPage: 3, sort: "rating" })
      .then((data) => {
        setDoctors(data.doctors || []);
        setLoading(false);
      })
      .catch(() => {
        setDoctors([]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Doctors"
            title="Specialists patients trust first"
            description="Book highly-rated professionals. Dynamic doctor cards show experience, specialization, consultation fee, and rating."
            align="left"
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
        
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))
          ) : (
            doctors.map((doctor, index) => (
              <motion.div
                key={doctor._id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
                className="h-full"
              >
                <DoctorCard doctor={doctor} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
