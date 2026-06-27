import DoctorsClient from "@/components/doctors/DoctorsClient";
import { Suspense } from "react";
import LoadingState from "@/components/shared/LoadingState";

export const metadata = {
  title: "Find Doctors",
};

export default function FindDoctorsPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading doctors..." />}>
      <DoctorsClient />
    </Suspense>
  );
}
