"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, Phone, Save, Shield, User as UserIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LoadingState from "@/components/shared/LoadingState";

export default function ProfileClient() {
  const { user, loading, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  if (loading || !user) return <LoadingState label="Loading profile..." />;

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProfile(Object.fromEntries(new FormData(event.currentTarget)));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mx-auto max-w-4xl"
    >
      {/* Decorative Ambient Glow */}
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      
      <div className="glass-card relative z-10 overflow-hidden rounded-3xl border border-border/50 bg-card/60 shadow-2xl shadow-primary/5 backdrop-blur-xl">
         {/* Profile Header Area */}
         <div className="relative overflow-hidden border-b border-border/50 bg-muted/30 p-8 sm:p-10">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row">
               <div className="group relative size-28 shrink-0 overflow-hidden rounded-full border-4 border-background bg-muted shadow-lg">
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                      <UserIcon className="size-10" />
                    </div>
                  )}
                  {/* Decorative overlay for future photo upload feature */}
                  <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Camera className="size-6 text-white" />
                  </div>
               </div>
               
               <div className="text-center sm:text-left">
                 <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                   My Profile
                 </p>
                 <h2 className="font-heading text-3xl font-extrabold text-foreground">
                   {user.name || "Update your identity"}
                 </h2>
                 <p className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                   <Shield className="size-4 text-primary" />
                   Role: <span className="font-semibold capitalize text-foreground">{user.role}</span>
                 </p>
               </div>
            </div>
         </div>

         {/* Form Area */}
         <form onSubmit={submit} className="p-8 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-2">
               
               <div className="space-y-6 sm:col-span-2">
                 <h3 className="flex items-center gap-2 border-b border-border/50 pb-2 text-lg font-bold text-foreground">
                   <UserIcon className="size-5 text-primary" />
                   Personal Information
                 </h3>
                 <div className="grid gap-5 sm:grid-cols-2">
                   <Input name="name" label="Full Name" defaultValue={user.name || ""} required className="bg-background/50" />
                   <Input name="gender" label="Gender" defaultValue={user.gender || ""} className="bg-background/50" />
                   <div className="sm:col-span-2">
                     <Input name="photo" label="Profile Photo URL" defaultValue={user.photo || ""} placeholder="https://..." className="bg-background/50" />
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <h3 className="flex items-center gap-2 border-b border-border/50 pb-2 text-lg font-bold text-foreground">
                   <Phone className="size-5 text-primary" />
                   Contact Details
                 </h3>
                 <div className="grid gap-5">
                   <Input name="phone" label="Phone Number" defaultValue={user.phone || ""} className="bg-background/50" />
                 </div>
               </div>

               <div className="space-y-6">
                 <h3 className="flex items-center gap-2 border-b border-border/50 pb-2 text-lg font-bold text-foreground">
                   <Mail className="size-5 text-muted-foreground" />
                   System Accounts (Read-only)
                 </h3>
                 <div className="grid gap-5">
                   <Input label="Email Address" defaultValue={user.email || ""} disabled className="cursor-not-allowed bg-muted/50 opacity-70" />
                 </div>
               </div>
               
            </div>

            <div className="mt-10 flex justify-end border-t border-border/50 pt-6">
               <Button 
                 type="submit" 
                 size="lg" 
                 disabled={saving} 
                 className="h-12 w-full bg-gradient-to-r from-primary to-sky-600 text-base font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-95 sm:w-auto sm:px-8"
               >
                 <Save className="mr-2 size-4" />
                 {saving ? "Saving Changes..." : "Save Profile"}
               </Button>
            </div>
         </form>
      </div>
    </motion.section>
  );
}
