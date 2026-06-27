"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Star, MessageSquarePlus, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api/base";
import { getDoctors, getReviews, normalizeReview } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

export default function PatientReviews() {
  const { token, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token || !user?._id) return;
    getReviews({ patientId: user._id })
      .then((items) => setReviews(items || []))
      .catch(() => setReviews([]));
  }, [token, user]);

  useEffect(() => {
    getDoctors({ perPage: 50 })
      .then((data) => setDoctors(data.doctors || []))
      .catch(() => setDoctors([]));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const review = await apiFetch("/reviews", {
        method: "POST",
        token,
        body: {
          doctorId: new FormData(event.currentTarget).get("doctorId"),
          rating: new FormData(event.currentTarget).get("rating"),
          comment: new FormData(event.currentTarget).get("reviewText"),
        },
      });
      setReviews((items) => [normalizeReview(review), ...items]);
      event.currentTarget.reset();
      toast.success("Review added successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
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
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      {/* ADD REVIEW SECTION */}
      <form onSubmit={submit} className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl shadow-sm sm:p-8 h-fit">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Add Review
          </p>
          <h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Share your care experience
          </h2>
          
          <div className="mt-8 grid gap-5">
            <div className="relative grid gap-1.5 text-left group">
              <label className="text-sm font-semibold text-foreground">Doctor</label>
              <div className="relative">
                <select
                  name="doctorId"
                  required
                  defaultValue=""
                  className="peer h-12 w-full appearance-none rounded-xl border border-input/60 bg-background/50 px-4 text-sm font-medium outline-none transition-all duration-300 hover:border-primary/40 focus:border-primary focus:bg-background focus:ring-[4px] focus:ring-primary/15 focus:shadow-md"
                >
                  <option value="" disabled>Select a Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.doctorName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative grid gap-1.5 text-left group">
              <label className="text-sm font-semibold text-foreground">Rating</label>
              <div className="relative">
                <select
                  name="rating"
                  required
                  defaultValue=""
                  className="peer h-12 w-full appearance-none rounded-xl border border-input/60 bg-background/50 px-4 text-sm font-medium outline-none transition-all duration-300 hover:border-primary/40 focus:border-primary focus:bg-background focus:ring-[4px] focus:ring-primary/15 focus:shadow-md"
                >
                  <option value="" disabled>Select Rating</option>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-1.5">
              <label className="text-sm font-semibold text-foreground">Review</label>
              <Textarea
                name="reviewText"
                placeholder="Write a short review about your experience..."
                required
                className="bg-background/50 min-h-[120px]"
              />
            </div>

            <Button type="submit" size="lg" disabled={submitting} className="mt-2 w-full bg-gradient-to-r from-primary to-sky-600 font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-95">
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </form>

      {/* MY REVIEWS SECTION */}
      <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl shadow-sm sm:p-8">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            My Reviews
          </p>
          <h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Past feedback
          </h2>
        </div>

        <div className="relative z-10 grid gap-4">
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/50 bg-background/30 p-12 text-center">
              <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <MessageSquarePlus className="size-8" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">No reviews yet</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
                You haven't shared any care experiences yet. Once you leave a review for a doctor, it will appear here.
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <article
                key={review._id}
                className="group flex flex-col gap-4 rounded-2xl border border-border/50 bg-background/50 p-5 transition-all duration-300 hover:bg-muted/30 hover:shadow-md hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {review.doctorName}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 w-fit">
                      <Star className="size-3.5 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        {review.rating} / 5
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    size="icon"
                    className="size-8 shrink-0 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg shadow-none"
                    onClick={() => remove(review._id)}
                    title="Delete Review"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground bg-muted/30 p-3 rounded-xl border border-border/50">
                  {review.reviewText}
                </p>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
