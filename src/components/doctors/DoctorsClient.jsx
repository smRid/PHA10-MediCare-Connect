"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, LayoutGrid, List, Search } from "lucide-react";
import { demoDoctors, specializations } from "@/lib/demo-data";
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
        className="flex h-11 w-full items-center justify-between gap-3 rounded-lg border border-input bg-background px-3 text-left text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="specialization-scrollbar absolute left-0 right-0 top-[calc(100%+0.4rem)] z-40 max-h-56 overflow-y-auto rounded-lg border border-border bg-background p-1 pr-2 shadow-2xl shadow-black/25"
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
                className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition ${
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
        </div>
      )}
    </div>
  );
}

export default function DoctorsClient() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [sort, setSort] = useState("rating");
  const [page, setPage] = useState(1);
  const [layout, setLayout] = useState("card");
  const [data, setData] = useState({
    doctors: demoDoctors,
    total: demoDoctors.length,
    page: 1,
    perPage: 9,
  });
  const [loading, setLoading] = useState(false);

  const params = useMemo(
    () => ({ search, specialization, sort, page, perPage: 9 }),
    [page, search, sort, specialization],
  );

  useEffect(() => {
    Promise.resolve().then(() => setLoading(true));
    getDoctors(params)
      .then((payload) =>
        setData(
          payload.doctors?.length
            ? payload
            : {
                doctors: demoDoctors,
                total: demoDoctors.length,
                page: 1,
                perPage: 9,
              },
        ),
      )
      .catch(() => {
        let filtered = demoDoctors.filter((doctor) => {
          const haystack =
            `${doctor.doctorName} ${doctor.specialization}`.toLowerCase();
          return haystack.includes(search.toLowerCase());
        });
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
          filtered.sort((a, b) => b.ratingAverage - a.ratingAverage);
        }
        setData({
          doctors: filtered,
          total: filtered.length,
          page: 1,
          perPage: 9,
        });
      })
      .finally(() => setLoading(false));
  }, [params, search, sort, specialization]);

  const totalPages = Math.max(
    Math.ceil((data.total || 0) / (data.perPage || 9)),
    1,
  );

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Find Doctors"
          title="Search verified specialists by name or care field"
          description="Use advanced search, sorting, pagination, and a card/table layout toggle."
        />

        <div className="mt-8 grid gap-3 rounded-lg border border-border bg-card p-4 lg:grid-cols-[1.3fr_0.8fr_0.8fr_auto]">
          <label className="flex h-11 items-center gap-2 rounded-lg border border-input bg-background px-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Doctor name or specialization"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
          <SpecializationFilter
            value={specialization}
            onChange={(nextSpecialization) => {
              setSpecialization(nextSpecialization);
              setPage(1);
            }}
          />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none"
          >
            <option value="rating">Highest Rating</option>
            <option value="experience">Experience</option>
            <option value="fee_asc">Fee Low to High</option>
            <option value="fee_desc">Fee High to Low</option>
          </select>
          <div className="flex gap-2">
            <Button
              variant={layout === "card" ? "primary" : "outline"}
              size="icon"
              onClick={() => setLayout("card")}
              aria-label="Card layout"
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              variant={layout === "table" ? "primary" : "outline"}
              size="icon"
              onClick={() => setLayout("table")}
              aria-label="Table layout"
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          {loading
            ? "Loading doctors..."
            : `${data.total || data.doctors.length} doctors found`}
        </p>

        {layout === "card" ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Doctor</th>
                    <th className="px-4 py-3">Specialization</th>
                    <th className="px-4 py-3">Experience</th>
                    <th className="px-4 py-3">Fee</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.doctors.map((doctor) => (
                    <tr key={doctor._id} className="border-t border-border">
                      <td className="px-4 py-3 font-semibold">
                        {doctor.doctorName}
                      </td>
                      <td className="px-4 py-3">{doctor.specialization}</td>
                      <td className="px-4 py-3">{doctor.experience} years</td>
                      <td className="px-4 py-3">
                        {currency(doctor.consultationFee)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill
                          status={doctor.verificationStatus || "verified"}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/doctors/${doctor._id}`}
                          className="font-bold text-primary hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          >
            Previous
          </Button>
          <span className="text-sm font-semibold">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((value) => value + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}