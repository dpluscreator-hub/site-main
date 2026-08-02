"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X, CheckCircle2 } from "lucide-react"; 
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { BookMeetingForm } from "@/components/forms/BookAMeetingForm";
import { toast } from "sonner";

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookMeetingModal({ isOpen, onClose }: BookMeetingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "Meeting Request",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Meeting request submitted successfully!");
        
        setTimeout(() => {
          onClose();
          setTimeout(() => setSubmitted(false), 300); 
        }, 2000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast.error("Failed to submit meeting request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* SIZE UPGRADE: 
        Reduced max-w-[700px] to max-w-[550px]. 
        Kept rounded-[24px] for the modern look.
      */}
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden border-0 bg-white rounded-[24px] shadow-2xl">
        
        <VisuallyHidden.Root>
          <DialogTitle>Book a Meeting</DialogTitle>
          <DialogDescription>
            Schedule a free consultation with our team by filling out the form.
          </DialogDescription>
        </VisuallyHidden.Root>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="py-16 px-6 text-center"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Meeting Requested!</h3>
              <p className="text-gray-500 text-sm">We'll confirm your meeting shortly via email.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Tighter Header Padding (p-6) & Reduced Font Size (text-2xl) */}
              <div className="bg-[#1a1a1a] text-white p-6 relative">
                <div className="flex flex-col pr-8">
                  <h2 className="text-2xl font-bold tracking-tight">Book a Meeting</h2>
                  <p className="text-gray-400 text-sm mt-1 font-medium">
                    Schedule a free consultation with our team
                  </p>
                </div>
                
                <button
                  onClick={onClose}
                  className="absolute right-5 top-5 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 text-white/80" />
                </button>
              </div>

              {/* Tighter Form Padding (p-6) */}
              <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
                <BookMeetingForm 
                  onSubmit={handleSubmit} 
                  isSubmitting={isSubmitting} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}