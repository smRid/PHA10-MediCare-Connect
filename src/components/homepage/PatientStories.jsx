"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { getReviews } from "@/lib/api/healthcare";
import SectionHeading from "@/components/shared/SectionHeading";

export default function PatientStories() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews()
      .then((items) => setReviews(items?.length ? items.slice(0, 6) : []))
      .catch(() => setReviews([]));
  }, []);

  return (
    <section className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeading
          align="center"
          eyebrow="Patient Success Stories"
          title="Care journeys that felt less complicated"
          description="Real stories from patients who found the right care, right when they needed it."
        />
        
        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, index) => (
            <motion.article
              key={review._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              className="group break-inside-avoid relative overflow-hidden rounded-3xl glass-card border border-border/50 p-8 shadow-lg shadow-primary/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40"
            >
              {/* Decorative Oversized Background Quote */}
              <div className="absolute -right-4 -top-4 text-primary/5 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 pointer-events-none">
                <Quote className="size-32 rotate-12" strokeWidth={1} />
              </div>
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
                  <Quote className="size-6 transition-transform duration-300 group-hover:-rotate-12" fill="currentColor" />
                </div>
                
                <p className="min-h-24 text-base italic leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  "{review.reviewText}"
                </p>
                
                <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-6">
                  <div>
                    <p className="font-heading text-lg font-bold text-foreground">{review.patientName}</p>
                    <p className="mt-1 text-xs font-semibold text-primary">
                      Consulted {review.doctorName}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm transition-transform group-hover:scale-105">
                    <Star className="size-3.5 fill-current" />
                    {review.rating}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
