import AuthSidePanel from "./AuthSidePanel";

export default function AuthLayout({ children }) {
  return (
    <main className="medical-grid grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
      <AuthSidePanel />
      <section className="flex items-center justify-center px-4 py-12">
        {children}
      </section>
    </main>
  );
}
