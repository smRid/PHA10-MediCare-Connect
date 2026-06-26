"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, PhoneCall, Send } from "lucide-react";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ContactPage() {
  const submit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success("Message received. Our care team will respond soon.");
  };

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Decorative Ambient Background */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/2 -translate-x-1/2 rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <SectionHeading
            align="left"
            eyebrow="Contact Us"
            title="Need help finding the right care?"
            description="Send a message, call the emergency hotline, or reach our appointment team directly."
          />
          
          <div className="mt-12 grid gap-5">
            {[
              {
                icon: PhoneCall,
                label: "Emergency hotline",
                value: "+1 800 555 CARE",
              },
              {
                icon: Mail,
                label: "Support email",
                value: "support@medicareconnect.test",
              },
              {
                icon: MapPin,
                label: "Care hub",
                value: "42 Wellness Ave, New York, NY",
              },
            ].map(({ icon: Icon, label, value }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="group relative flex items-center gap-5 rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/30">
                  <Icon className="size-6 transition-transform duration-300 group-hover:-rotate-12" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-1 font-heading text-lg font-bold text-foreground transition-colors group-hover:text-primary">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          {/* Form Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-sky-500/20 blur-2xl opacity-50 pointer-events-none rounded-[3rem]" />
          
          <form
            onSubmit={submit}
            className="relative grid gap-6 rounded-[2.5rem] border border-border/50 bg-card/80 p-8 backdrop-blur-2xl shadow-2xl shadow-primary/10 sm:p-10"
          >
            <div className="mb-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">Send a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">We usually respond within 2-4 hours.</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <Input name="name" label="Full Name" placeholder="John Doe" required className="bg-background/50" />
              <Input
                name="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-background/50"
              />
            </div>
            <Input
              name="subject"
              label="Subject"
              placeholder="e.g. Appointment support"
              required
              className="bg-background/50"
            />
            <Textarea
              name="message"
              label="Message"
              placeholder="How can we help you today?"
              required
              className="min-h-[150px] bg-background/50"
            />
            
            <Button 
              type="submit" 
              size="lg" 
              className="mt-2 h-14 w-full bg-gradient-to-r from-primary to-sky-600 text-lg font-bold text-white shadow-xl shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Send className="size-5 mr-2" />
              Send Message
            </Button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
