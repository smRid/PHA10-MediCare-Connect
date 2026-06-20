"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { demoReviews } from "@/lib/demo-data";
import { getReviews } from "@/lib/api/healthcare";
import SectionHeading from "@/components/shared/SectionHeading";

export default function PatientStories() {
  const [reviews, setReviews] = useState(demoReviews);

  useEffect(() => {
    getReviews()
      .then((items) => setReviews(items?.length ? items.slice(0, 3) : demoReviews))
      .catch(() => setReviews(demoReviews));
  }, []);

  return (
    <section className="bg-card/60 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="Patient Success Stories"
          title="Care journeys that felt less complicated"
          description="Testimonials can be powered directly from the reviews collection."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review._id || index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-lg border border-border bg-background p-5"
            >
              <Quote className="mb-5 size-7 text-primary" />
              <p className="min-h-24 text-sm leading-6 text-muted-foreground">
                {review.reviewText}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold">{review.patientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.doctorName}
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                  <Star className="size-3 fill-current" />
                  {review.rating}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
