import AuthSidePanel from "./AuthSidePanel";

export default function AuthLayout({ children }) {
  return (
    <main className="medical-grid grid min-h-screen lg:h-screen lg:overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
      <AuthSidePanel />
      <section className="flex h-full items-center justify-center overflow-y-auto px-4 py-8 lg:py-0">
        {children}
      </section>
    </main>
  );
}
