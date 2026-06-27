export default function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <img 
        src="/logo.svg" 
        alt="MediCare Connect Logo" 
        className={compact ? "h-8 w-auto" : "h-10 w-auto"} 
      />
      {!compact && (
        <span className="font-heading text-xl font-extrabold tracking-tight">
          MediCare<span className="text-primary">Connect</span>
        </span>
      )}
    </div>
  );
}
