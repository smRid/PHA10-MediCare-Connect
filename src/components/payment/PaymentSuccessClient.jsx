"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Button from "@/components/ui/Button";

export default function PaymentSuccessClient() {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [countdown, setCountdown] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center p-4">
      {mounted && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} gravity={0.2} />}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 text-center shadow-2xl shadow-primary/20 backdrop-blur-xl"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600" />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 text-green-500 mb-6"
        >
          <CheckCircle2 className="h-12 w-12" />
        </motion.div>

        <h1 className="font-heading text-3xl font-extrabold text-foreground mb-3">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-8 text-base leading-relaxed">
          Your appointment has been securely booked and payment is confirmed. A receipt will be emailed to you shortly.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push("/dashboard")}
            className="h-12 w-full bg-gradient-to-r from-primary to-sky-600 font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            Go to Dashboard Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-xs font-semibold text-muted-foreground mt-4 flex items-center justify-center gap-2">
            <Loader2 className="h-3 w-3 animate-spin" />
            Redirecting automatically in {countdown} seconds...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
