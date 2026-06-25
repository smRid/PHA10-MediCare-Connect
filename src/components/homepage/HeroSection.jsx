
    return () => clearInterval(timer);
  }, []);

  const metrics = useMemo(
    () => [
      {
        label: "Appointments booked",
        value: compactNumber(stats.totalAppointments),
      },
      {
        label: "Verified doctors",
        value: `${compactNumber(stats.totalDoctors)}+`,
      },
      {
        label: "Patients connected",
        value: compactNumber(stats.totalPatients),
      },
    ],
    [stats],
  );

  return (
    <section className="relative overflow-hidden border-b border-border px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="absolute inset-0 medical-grid opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur">
            <HeartPulse className="size-4" />
            Live hospital appointment ecosystem
          </div>
          <h1 className="mt-6 max-w-4xl font-heading text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Book trusted care before the waiting room fills up.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            MediCare Connect helps patients find verified doctors, pay securely,
            track appointments, and keep prescriptions connected to one calm
            healthcare workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/find-doctors">
              <Button size="lg">
                Find Doctors
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border bg-card/80 p-3"
              >
                <p className="font-heading text-xl font-extrabold text-primary">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={heroSlides[activeSlide].src}
                src={heroSlides[activeSlide].src}
                alt={heroSlides[activeSlide].alt}
                className="h-[560px] w-full object-cover"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/8 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-full border border-white/30 bg-background/75 px-3 py-2 backdrop-blur">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    aria-label={`Show healthcare image ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeSlide === index
                        ? "w-7 bg-primary"
                        : "w-2 bg-muted-foreground/45 hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
