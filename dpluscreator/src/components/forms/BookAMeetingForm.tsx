"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Input } from "../ui/input";
import { Calendar, Clock } from "lucide-react";

// --- Form Validation Schema ---
const formSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be at most 50 characters."),
    email: z.string()
        .email("Please enter a valid email address."),
    phone: z.string()
        .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number.")
        .optional()
        .or(z.literal("")),
    company: z.string()
        .max(100, "Company name must be at most 100 characters.")
        .optional()
        .or(z.literal("")),
    service: z.string()
        .min(1, "Please select a service."),
    date: z.string()
        .min(1, "Please select a date."),
    time: z.string()
        .min(1, "Please select a time."),
    message: z.string()
        .max(500, "Message must be at most 500 characters.")
        .optional()
        .or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface BookMeetingFormProps {
    onSubmit: (data: FormData) => Promise<void>;
    isSubmitting?: boolean;
}

export function BookMeetingForm({ onSubmit, isSubmitting = false }: BookMeetingFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            company: "",
            service: "",
            date: "",
            time: "",
            message: "",
        },
        mode: "onChange",
    });

    const services = [
        "Social Media Management",
        "Graphic Design",
        "Video Editing",
        "Brand Identity",
        "Web Design",
        "Content Creation",
        "Ads Creatives",
        "Marketing",
        "Multiple Services",
    ];

    const timeSlots = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
    ];

    const handleFormSubmit = async (data: FormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            toast.error("Failed to submit form. Please try again.");
        }
    };

    // Helper function to format date for display
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <form id="book-meeting-form" onSubmit={form.handleSubmit(handleFormSubmit)}>
            <Card className="border-0 shadow-none">
                <CardContent className="pt-6">
                    <FieldGroup className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Name Field with Icon */}
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="relative">

                                        <FloatingLabelInput
                                            {...field}
                                            id="name"
                                            label="Full Name *"
                                            aria-invalid={fieldState.invalid}
                                            className="
  h-14 
  rounded-xl 
  pl-12 
  bg-gray-50 
  border-gray-200
  focus:bg-white 
  focus:border-brand-primary
  focus:ring-2 
  focus:ring-brand-primary/20
"

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} className="mt-1" />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Email Field with Icon */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="relative">

                                        <FloatingLabelInput
                                            {...field}
                                            id="email"
                                            type="email"
                                            label="Email *"
                                            aria-invalid={fieldState.invalid}
                                            className="
  h-14 
  rounded-xl 
  pl-12 
  bg-gray-50 
  border-gray-200
  focus:bg-white 
  focus:border-brand-primary
  focus:ring-2 
  focus:ring-brand-primary/20
"

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} className="mt-1" />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>


                        {/* Grid for Phone and Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Phone Field with Icon */}
                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="relative">

                                        <FloatingLabelInput
                                            {...field}
                                            id="phone"
                                            label="Phone Number"
                                            aria-invalid={fieldState.invalid}
                                            className="
  h-14 
  rounded-xl 
  pl-12 
  bg-gray-50 
  border-gray-200
  focus:bg-white 
  focus:border-brand-primary
  focus:ring-2 
  focus:ring-brand-primary/20
"

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} className="mt-1" />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Company Field with Icon */}
                            <Controller
                                name="company"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="relative">

                                        <FloatingLabelInput
                                            {...field}
                                            id="company"
                                            label="Company"
                                            aria-invalid={fieldState.invalid}
                                            className="
  h-14 
  rounded-xl 
  pl-12 
  bg-gray-50 
  border-gray-200
  focus:bg-white 
  focus:border-brand-primary
  focus:ring-2 
  focus:ring-brand-primary/20
"

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} className="mt-1" />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Service Field - Enhanced Select */}
                        <Controller
                            name="service"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="relative">
                                        <svg
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger
                                                id="service"
                                                className="
    h-14 
    rounded-xl 
    pl-12 
    text-gray-500
    bg-gray-50 
    border-gray-200
    focus:ring-2 
    focus:ring-brand-primary/20
  "
                                                aria-invalid={fieldState.invalid}
                                            >
                                                <SelectValue placeholder="Select a service" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[300px]">
                                                {services.map((service) => (
                                                    <SelectItem key={service} value={service} className="py-3">
                                                        {service}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} className="mt-1" />
                                        )}
                                    </div>
                                </Field>
                            )}
                        />

                        {/* Grid for Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Date Field */}

                            <Controller
                                name="date"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-muted-foreground" htmlFor="date">
                                            Preferred Date <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <div className="relative">
                                            <Calendar
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10"
                                            />
                                            <Input
                                                {...field}
                                                id="date"
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                                aria-invalid={fieldState.invalid}
                                                className="
    h-14 
    rounded-xl 
    pl-12 
    text-gray-500
    bg-gray-50 
    border-gray-200
    focus:ring-2 
    focus:ring-brand-primary/20
  "
                                            />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Time Field */}
                            <Controller
                                name="time"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-muted-foreground" htmlFor="time">
                                            Preferred Time <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <div className="relative">
                                            <Clock
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10"
                                            />
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    id="time"
                                                    className="
    h-14 
    rounded-xl 
    pl-12 
    text-gray-500
    bg-gray-50 
    border-gray-200
    focus:ring-2 
    focus:ring-brand-primary/20
  "
                                                    aria-invalid={fieldState.invalid}
                                                >
                                                    <SelectValue placeholder="Select a time" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {timeSlots.map((time) => (
                                                        <SelectItem key={time} value={time}>
                                                            {time}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Message Field - Enhanced with Floating Label Textarea */}
                        <Controller
                            name="message"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="message">Additional Notes</FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="message"
                                            placeholder="Tell us about your project or any specific requirements..."
                                            rows={3}
                                            className="min-h-24 resize-none rounded-xl"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value?.length}/500 characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </CardContent>
                <CardFooter className="pt-2">
                    <Button
                        type="submit"
                        form="book-meeting-form"
                        disabled={isSubmitting || !form.formState.isValid}
                        className="w-full bg-brand-primary text-dark font-bold py-6 rounded-xl hover:bg-brand-primary/90 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-md group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Booking...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Book Meeting
                                </>
                            )}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-white/20 to-brand-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}