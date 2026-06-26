"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, CalendarPlus, Clock, CreditCard, MapPin, ShieldCheck, Star } from "lucide-react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api/base";
import { getDoctorById, getReviews } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import { currency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import StatusPill from "@/components/shared/StatusPill";
import LoadingState from "@/components/shared/LoadingState";

export default function DoctorDetailsClient({ doctorId }) {
  const { user, token } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [defaultDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  });

  useEffect(() => {
    Promise.all([getDoctorById(doctorId), getReviews({ doctorId })])
      .then(([doctorPayload, reviewPayload]) => {
        setDoctor(doctorPayload);
        setReviews(reviewPayload);
      })
      .finally(() => setLoading(false));
  }, [doctorId]);


  const submit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.info("Please login as a patient before booking");
      return;
    }
    if (user.role !== "patient") {
      toast.error("Only patient accounts can book appointments");
      return;
    }

    const form = Object.fromEntries(new FormData(event.currentTarget));
    setSubmitting(true);
    try {
      const appointment = await apiFetch("/appointments", {
        method: "POST",
        token,
        body: {
          doctorId: doctor._id,
          date: form.appointmentDate,
          time: form.appointmentTime,
          symptoms: form.symptoms,
        },
      });
      const intent = await apiFetch("/payments/create-intent", {
        method: "POST",
        token,
        body: { appointmentId: appointment._id },
      });
      await apiFetch("/payments", {
        method: "POST",
        token,
        body: {
          appointmentId: appointment._id,
          transactionId: intent.transactionId,
          status: "paid",
        },
      });
      toast.success("Appointment booked and payment recorded");
      event.currentTarget.reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState label="Loading doctor profile..." />;
  if (!doctor) return null;

  return (
    <main className="min-h-screen px-4 py-14 sm:px-6 lg:px-8 bg-background">
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.1fr]"
      >
        {/* Left Column: Profile */}
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl shadow-sm relative">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
            
            <div className="relative h-80 overflow-hidden sm:h-96">
              <img
                src={doctor.profileImage || "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80"}
                alt={doctor.doctorName}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                <StatusPill status={doctor.verificationStatus || "verified"} />
                <h1 className="mt-4 font-heading text-3xl font-extrabold text-foreground drop-shadow-md sm:text-4xl">
                  {doctor.doctorName}
                </h1>
                <p className="mt-2 text-lg font-bold text-primary">{doctor.specialization}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 relative z-10">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {doctor.bio || doctor.qualifications}
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/50 bg-muted/40 p-4 text-center shadow-inner">
                  <Activity className="mx-auto mb-2 size-6 text-primary" />
                  <p className="text-2xl font-black text-foreground">{doctor.experience}+</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Years Exp.</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-muted/40 p-4 text-center shadow-inner">
                  <Star className="mx-auto mb-2 size-6 text-amber-500" />
                  <p className="text-2xl font-black text-foreground">{doctor.ratingAverage || 4.8}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rating</p>
                </div>
                <div className="col-span-2 rounded-2xl border border-border/50 bg-muted/40 p-4 text-center shadow-inner sm:col-span-1">
                  <ShieldCheck className="mx-auto mb-2 size-6 text-green-500" />
                  <p className="text-2xl font-black text-foreground">{currency(doctor.consultationFee)}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Consultation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <MapPin className="size-5" />
              </div>
              <h2 className="font-heading text-2xl font-bold">Location & Time</h2>
            </div>
            <p className="mb-6 text-lg font-semibold text-foreground">
              {doctor.hospitalName}
            </p>
            <div className="flex flex-wrap gap-2">
              {(doctor.availableDays || []).map((day) => (
                <span key={day} className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary transition-colors hover:bg-primary/10">
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking */}
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-6 backdrop-blur-xl shadow-lg shadow-primary/5 sm:p-8">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-sky-500/10 blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 mb-2 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <CalendarPlus className="size-5" />
              </div>
              <h2 className="font-heading text-2xl font-bold">Book Appointment</h2>
            </div>
            <p className="relative z-10 mb-8 text-sm font-medium text-muted-foreground">
              Select a preferred time slot and describe your symptoms.
            </p>

            <form onSubmit={submit} className="relative z-10 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  name="appointmentDate"
                  label="Date"
                  type="date"
                  defaultValue={defaultDate}
                  required
                />
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-foreground">Time Slot</label>
                  <div className="relative">
                    <select
                      name="appointmentTime"
                      className="h-12 w-full appearance-none rounded-xl border border-border/50 bg-background/50 px-4 text-sm font-medium outline-none transition-all focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10"
                    >
                      {(doctor.availableSlots || ["10:00 AM"]).map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <Clock className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <Textarea
                name="symptoms"
                label="Symptoms"
                placeholder="Briefly describe the symptoms or reason for visit..."
                required
              />
              
              {user ? (
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="mt-4 h-14 w-full bg-gradient-to-r from-primary to-sky-600 text-lg font-bold text-white shadow-xl shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <CreditCard className="mr-2 size-5" />
                  {submitting
                    ? "Processing Payment..."
                    : `Pay ${currency(doctor.consultationFee)} & Book`}
                </Button>
              ) : (
                <Link
                  href="/login"
                  className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95"
                >
                  <CalendarPlus className="size-5" />
                  Login to Book Appointment
                </Link>
              )}
            </form>
          </div>

          <div className="rounded-3xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl shadow-sm sm:p-8">
            <h2 className="mb-6 font-heading text-2xl font-bold">Patient Reviews</h2>
            <div className="grid gap-4">
              {reviews.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border/50 py-8 text-center text-sm font-medium text-muted-foreground">
                  No reviews yet for this doctor.
                </p>
              ) : (
                reviews.map((review) => (
                  <article
                    key={review._id}
                    className="rounded-2xl border border-border/50 bg-background/50 p-5 transition-colors hover:bg-muted/30"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary ring-1 ring-primary/20">
                          {review.patientName.charAt(0)}
                        </div>
                        <p className="font-bold text-foreground">{review.patientName}</p>
                      </div>
                      <span className="flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                        <Star className="size-3 fill-current" />
                        {review.rating}
                      </span>
                    </div>
                    <p className="pl-13 text-sm leading-relaxed text-muted-foreground">
                      {review.reviewText}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}