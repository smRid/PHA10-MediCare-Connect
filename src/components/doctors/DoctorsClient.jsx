"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, LayoutGrid, List, Search } from "lucide-react";
import { specializations } from "@/lib/constants";
import { getDoctors } from "@/lib/api/healthcare";
import Button from "@/components/ui/Button";
import DoctorCard from "@/components/doctors/DoctorCard";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusPill from "@/components/shared/StatusPill";
import { currency } from "@/lib/utils";

function SpecializationFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const options = ["", ...specializations];
  const selectedLabel = value || "All specializations";

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/50 py-3 pl-4 pr-3 text-left text-sm font-medium outline-none transition-all focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10 hover:bg-background"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="listbox"
            className="specialization-scrollbar absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-64 overflow-y-auto rounded-xl border border-border/50 bg-card/95 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            {options.map((item) => {
              const label = item || "All specializations";
              const selected = item === value;

              return (
                <button
                  key={label}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="truncate">{label}</span>
                  {selected && <Check className="size-4 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SortFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  
  const options = [
    { value: "rating", label: "Highest Rating" },
    { value: "experience", label: "Years of Experience" },
    { value: "fee_asc", label: "Fee (Low to High)" },
    { value: "fee_desc", label: "Fee (High to Low)" },
  ];
  
  const selectedLabel = options.find((opt) => opt.value === value)?.label || "Highest Rating";

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/50 py-3 pl-4 pr-3 text-left text-sm font-medium outline-none transition-all focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10 hover:bg-background"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="listbox"
            className="specialization-scrollbar absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-64 overflow-y-auto rounded-xl border border-border/50 bg-card/95 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            {options.map((item) => {
              const selected = item.value === value;

              return (
                <button
                  key={item.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {selected && <Check className="size-4 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DoctorsClient() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState(searchParams?.get("specialization") || "");
  const [sort, setSort] = useState("rating");
  const [page, setPage] = useState(1);
  const [layout, setLayout] = useState("card");
  const [data, setData] = useState({
    doctors: [],
    total: 0,
    page: 1,
    perPage: 9,
  });
  const [loading, setLoading] = useState(false);

  const params = useMemo(
    () => ({ search, specialization, sort, page, perPage: 9 }),
    [page, search, sort, specialization],
  );

  useEffect(() => {
    setLoading(true);
    getDoctors(params)
      .then((res) => {
        let filtered = res.doctors || [];
        if (search) {
          filtered = filtered.filter((doctor) => {
            const haystack =
              `${doctor.doctorName} ${doctor.specialization}`.toLowerCase();
            return haystack.includes(search.toLowerCase());
          });
        }
        if (specialization) {
          filtered = filtered.filter(
            (doctor) => doctor.specialization === specialization,
          );
        }
        if (sort === "fee_asc") {
          filtered.sort((a, b) => a.consultationFee - b.consultationFee);
        }
        if (sort === "fee_desc") {
          filtered.sort((a, b) => b.consultationFee - a.consultationFee);
        }
        if (sort === "experience") {
          filtered.sort((a, b) => b.experience - a.experience);
        }
        if (sort === "rating") {
          filtered.sort((a, b) => (b.ratingAverage || 0) - (a.ratingAverage || 0));
        }
        setData({
          doctors: filtered,
          total: filtered.length,
          page: 1,
          perPage: 9,
        });
      })
      .catch(() => setData({ doctors: [], total: 0, page: 1, perPage: 9 }))
      .finally(() => setLoading(false));
  }, [params, search, sort, specialization]);

  const totalPages = Math.max(
    Math.ceil((data.total || 0) / (data.perPage || 9)),
    1,
  );

  return (
    <main className="min-h-screen px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Find Doctors"
          title="Search verified specialists"
          description="Use advanced search, sorting, and filtering to find the perfect doctor for your needs."
        />

        <div className="mt-12 flex flex-col items-start gap-8 lg:flex-row">
          {/* Sticky Sidebar */}
          <aside className="w-full shrink-0 rounded-3xl border border-border/50 glass-card p-6 shadow-sm lg:sticky lg:top-28 lg:w-80 z-20">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold">Filters</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/20">
                {data.total || data.doctors.length} results
              </span>
            </div>
            
            <div className="grid gap-6">
              <div className="grid gap-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Search</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Doctor name or condition..."
                    className="w-full rounded-xl border border-border/50 bg-background/50 py-3 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10 placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>
              
              <div className="grid gap-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Specialization</label>
                <SpecializationFilter
                  value={specialization}
                  onChange={(nextSpecialization) => {
                    setSpecialization(nextSpecialization);
                    setPage(1);
                  }}
                />
              </div>

              <div className="grid gap-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sort By</label>
                <SortFilter value={sort} onChange={setSort} />
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="w-full flex-1">
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-border/50 bg-card/60 p-2 pl-5 backdrop-blur-xl shadow-sm">
              <p className="text-sm font-semibold text-muted-foreground">
                {loading ? "Searching..." : `Showing page ${page} of ${totalPages}`}
              </p>
              <div className="flex gap-2">
                <Button
                  variant={layout === "card" ? "primary" : "outline"}
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setLayout("card")}
                  aria-label="Card layout"
                >
                  <LayoutGrid className="size-4" />
                </Button>
                <Button
                  variant={layout === "table" ? "primary" : "outline"}
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setLayout("table")}
                  aria-label="Table layout"
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>

            {layout === "card" ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {data.doctors.map((doctor, index) => (
                    <motion.div
                      key={doctor._id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
                      className="h-full"
                    >
                      <DoctorCard doctor={doctor} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {!loading && data.doctors.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-lg font-bold text-muted-foreground">No doctors found matching your criteria.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-border/50 glass-card shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-muted/30 text-muted-foreground border-b border-border/50">
                      <tr>
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Doctor</th>
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Specialization</th>
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Experience</th>
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Fee</th>
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                        <th className="px-6 py-4 text-right font-bold uppercase tracking-wider text-[10px]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {data.doctors.map((doctor) => (
                        <tr key={doctor._id} className="group transition-colors hover:bg-muted/30">
                          <td className="px-6 py-4 font-bold text-foreground group-hover:text-primary transition-colors">
                            {doctor.doctorName}
                          </td>
                          <td className="px-6 py-4 font-medium text-muted-foreground">{doctor.specialization}</td>
                          <td className="px-6 py-4 font-medium text-muted-foreground">{doctor.experience} years</td>
                          <td className="px-6 py-4 font-medium text-foreground">
                            {currency(doctor.consultationFee)}
                          </td>
                          <td className="px-6 py-4">
                            <StatusPill
                              status={doctor.verificationStatus || "verified"}
                            />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/doctors/${doctor._id}`}
                              className="inline-flex h-9 items-center justify-center rounded-full bg-primary/10 px-4 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!loading && data.doctors.length === 0 && (
                    <div className="py-20 text-center">
                      <p className="text-sm font-medium text-muted-foreground">No doctors found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  className="rounded-full shadow-sm hover:shadow-md"
                  disabled={page <= 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                >
                  Previous
                </Button>
                <div className="flex h-10 items-center justify-center rounded-full bg-muted/50 px-4 text-sm font-bold shadow-inner">
                  Page {page} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  className="rounded-full shadow-sm hover:shadow-md"
                  disabled={page >= totalPages}
                  onClick={() => setPage((value) => value + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}