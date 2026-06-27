export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
