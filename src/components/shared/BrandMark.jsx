export default function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center">
      <img 
        src="/logo.svg" 
        alt="MediCare Connect Logo" 
        className={compact ? "h-8 w-auto" : "h-10 w-auto"} 
      />
    </div>
  );
}
