"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function CustomDropdown({ value, onChange, options, placeholder, icon: Icon, label }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={menuRef} className="relative text-left w-full">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className={`peer flex h-12 w-full items-center justify-between rounded-xl border bg-card/50 pl-4 pr-10 text-sm font-medium outline-none transition-all duration-300 hover:border-primary/40 focus:border-primary focus:bg-background focus:ring-[4px] focus:ring-primary/15 focus:shadow-md ${open ? 'border-primary ring-[4px] ring-primary/15' : 'border-input/60'}`}
        >
          <span className={`truncate ${!selectedOption ? "text-muted-foreground/70" : "text-foreground"}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </button>
        <label className={`absolute top-0 -translate-y-1/2 scale-[0.85] text-xs font-semibold transition-all duration-300 origin-left bg-card px-1.5 rounded-md pointer-events-none left-3 ${open || selectedOption ? "text-primary" : "text-muted-foreground"}`}>
          {label}
        </label>
        {Icon && (
          <Icon className={`pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 transition-colors duration-300 ${open ? "text-primary" : "text-muted-foreground"}`} />
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="specialization-scrollbar absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-60 overflow-y-auto rounded-xl border border-border/50 bg-card/95 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            {options.map((item) => {
              const selected = item.value === value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {selected && <Check className="size-4 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
