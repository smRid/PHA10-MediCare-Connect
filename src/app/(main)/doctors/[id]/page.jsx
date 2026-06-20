import DoctorDetailsClient from "@/components/doctors/DoctorDetailsClient";

export const metadata = {
  title: "Doctor Details",
};

export default async function DoctorDetailsPage({ params }) {
  const { id } = await params;
  return <DoctorDetailsClient doctorId={id} />;
}
