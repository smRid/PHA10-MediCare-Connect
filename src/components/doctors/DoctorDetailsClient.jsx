"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarPlus, CreditCard, Star } from "lucide-react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api/base";
import { getDoctorById } from "@/lib/api/healthcare";
import { demoDoctors, demoReviews } from "@/lib/demo-data";
import { useAuth } from "@/lib/auth-context";
import { currency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import StatusPill from "@/components/shared/StatusPill";
import LoadingState from "@/components/shared/LoadingState";

export default function DoctorDetailsClient({ doctorId }) {
  const { user, token } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getDoctorById(doctorId)
      .then((payload) => {
        setDoctor(payload.doctor);
        setReviews(payload.reviews || []);
      })
      .catch(() => {
        const fallback =
          demoDoctors.find((item) => item._id === doctorId) || demoDoctors[0];
        setDoctor(fallback);
        setReviews(demoReviews);
      })
      .finally(() => setLoading(false));
  }, [doctorId]);

  const defaultDate = useMemo(() => {
    const date = new Date(Date.now() + 86400000);
    return date.toISOString().slice(0, 10);
  }, []);

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
        body: { ...form, doctorId: doctor._id },
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

  if (loading) return <LoadingState label="Loading doctor profile" />;
  if (!doctor) return null;

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <img
            src={doctor.profileImage}
            alt={doctor.doctorName}
            className="h-[460px] w-full object-cover"
          />
          <div className="p-5">
            <StatusPill status={doctor.verificationStatus || "verified"} />
            <h1 className="mt-4 font-heading text-4xl font-extrabold">
              {doctor.doctorName}
            </h1>
            <p className="mt-2 text-primary">{doctor.specialization}</p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {doctor.bio || doctor.qualifications}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="blue">{doctor.experience}+ years experience</Badge>
              <Badge tone="green">{currency(doctor.consultationFee)} fee</Badge>
              <Badge tone="amber">{doctor.ratingAverage || 4.8} rating</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-heading text-2xl font-bold">Book appointment</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Patients must complete payment before the appointment is confirmed.
            </p>
            <form onSubmit={submit} className="mt-5 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  name="appointmentDate"
                  label="Date"
                  type="date"
                  defaultValue={defaultDate}
                  required
                />
                <label className="grid gap-1.5 text-sm font-medium">
                  Slot
                  <select
                    name="appointmentTime"
                    className="h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-primary"
                  >
                    {(doctor.availableSlots || ["10:00 AM"]).map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <Textarea
                name="symptoms"
                label="Symptoms"
                placeholder="Briefly describe the symptoms or reason for visit"
                required
              />
              {user ? (
                <Button type="submit" size="lg" disabled={submitting}>
                  <CreditCard className="size-4" />
                  {submitting
                    ? "Processing..."
                    : `Pay ${currency(doctor.consultationFee)} and Book`}
                </Button>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-semibold text-primary-foreground"
                >
                  <CalendarPlus className="size-4" />
                  Login to book
                </Link>
              )}
            </form>
          </section>

          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-heading text-2xl font-bold">Availability</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(doctor.availableDays || []).map((day) => (
                <Badge key={day} tone="teal">
                  {day}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Hospital:{" "}
              <span className="font-semibold text-foreground">
                {doctor.hospitalName}
              </span>
            </p>
          </section>

          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-heading text-2xl font-bold">Patient reviews</h2>
            <div className="mt-4 grid gap-3">
              {reviews.map((review) => (
                <article
                  key={review._id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{review.patientName}</p>
                    <span className="flex items-center gap-1 text-sm font-bold text-primary">
                      <Star className="size-4 fill-current" />
                      {review.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {review.reviewText}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
