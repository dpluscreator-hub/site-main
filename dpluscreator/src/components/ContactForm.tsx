import { useState } from "react";
import { motion } from "framer-motion";
export function DarkContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => null);

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent! We'll be in touch within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data?.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Failed to submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputClass = `
    w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-200
    placeholder:text-white/25
  `;
  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-xs tracking-widest uppercase mb-2 font-medium"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="Your name"
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(245,166,35,0.6)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.10)")
            }
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs tracking-widest uppercase mb-2 font-medium"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="your@email.com"
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(245,166,35,0.6)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.10)")
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-xs tracking-widest uppercase mb-2 font-medium"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="+91 7693063186"
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(245,166,35,0.6)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.10)")
            }
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-xs tracking-widest uppercase mb-2 font-medium"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="Your company"
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(245,166,35,0.6)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.10)")
            }
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs tracking-widest uppercase mb-2 font-medium"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={inputClass + " resize-none"}
          style={inputStyle}
          placeholder="Tell us about your project..."
          onFocus={(e) =>
            (e.target.style.borderColor = "rgba(245,166,35,0.6)")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "rgba(255,255,255,0.10)")
          }
        />
      </div>

      {submitStatus.type && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role={submitStatus.type === "error" ? "alert" : "status"}
          aria-live={submitStatus.type === "error" ? "assertive" : "polite"}
          className="p-4 rounded-xl text-sm"
          style={{
            background:
              submitStatus.type === "success"
                ? "rgba(245,166,35,0.12)"
                : "rgba(239,68,68,0.12)",
            border: `1px solid ${
              submitStatus.type === "success"
                ? "rgba(245,166,35,0.3)"
                : "rgba(239,68,68,0.3)"
            }`,
            color:
              submitStatus.type === "success" ? "#F5A623" : "rgb(252,165,165)",
          }}
        >
          {submitStatus.message}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full flex items-center justify-center gap-3 font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:gap-5"
        style={{ background: "#F5A623", color: "#111" }}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        {!isSubmitting && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
    </form>
  );
}