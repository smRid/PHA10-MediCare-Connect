import ProfileClient from "@/components/dashboardPage/ProfileClient";

export const metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen py-12 pt-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <ProfileClient />
    </main>
  );
}
