"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api/base";
import { getDoctors, getReviews } from "@/lib/api/healthcare";
import { demoDoctors, demoReviews } from "@/lib/demo-data";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

export default function PatientReviews() {
  const { token } = useAuth();
  const [reviews, setReviews] = useState(demoReviews);
  const [doctors, setDoctors] = useState(demoDoctors);

  useEffect(() => {
    getReviews().then(setReviews).catch(() => setReviews(demoReviews));
    getDoctors({ perPage: 50 })
      .then((data) => setDoctors(data.doctors || demoDoctors))
      .catch(() => setDoctors(demoDoctors));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const review = await apiFetch("/reviews", {
        method: "POST",
        token,
        body: Object.fromEntries(new FormData(event.currentTarget)),
      });
      setReviews((items) => [review, ...items]);
      event.currentTarget.reset();
      toast.success("Review added");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const remove = async (id) => {
    try {
      await apiFetch(`/reviews/${id}`, { method: "DELETE", token });
      setReviews((items) => items.filter((item) => item._id !== id));
      toast.success("Review deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={submit} className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
          Add Review
        </p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold">
          Share your care experience
        </h2>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-1.5 text-sm font-medium">
            Doctor
            <select
              name="doctorId"
              className="h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none"
            >
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.doctorName}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Rating
            <select
              name="rating"
              className="h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </label>
          <Textarea
            name="reviewText"
            label="Review"
            placeholder="Write a short review"
            required
          />
          <Button type="submit">Add Review</Button>
        </div>
      </form>

      <section className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
          My Reviews
        </p>
        <div className="mt-5 grid gap-3">
          {reviews.map((review) => (
            <article
              key={review._id}
              className="rounded-lg border border-border bg-background p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{review.doctorName}</p>
                  <p className="text-sm text-primary">Rating {review.rating}/5</p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => remove(review._id)}
                >
                  Delete
                </Button>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {review.reviewText}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
