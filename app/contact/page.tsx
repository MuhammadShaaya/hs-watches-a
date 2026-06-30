"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, MessageCircle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { SITE_SETTINGS } from "@/lib/data/misc";
import { cn } from "@/lib/utils";

const FAQS = [
  { q: "What is your return policy?", a: "We offer 30-day no-questions-asked returns on unworn pieces in original packaging with all tags and authentication documents intact." },
  { q: "Do you offer international shipping?", a: "Yes, we offer complimentary fully-insured worldwide shipping on every order, typically arriving within 3-7 business days." },
  { q: "How does Cash on Delivery work?", a: "Simply place your order online — no card details required. You pay in cash directly to the courier when your watch arrives." },
  { q: "What warranty comes with my watch?", a: "Every watch ships with a minimum 3-year international warranty, with select pieces covered up to 10 years." },
  { q: "How do I track my order?", a: "Once logged in, visit your Account Dashboard → Orders to view real-time tracking status for any order." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Message sent! Our concierge team will respond within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="container py-14">
      <div className="text-center">
        <p className="eyebrow text-gold-dark">Get In Touch</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">We&apos;d Love to Hear From You</h1>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-luxury border border-surface-border bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-luxury" />
            <input required type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-luxury" />
          </div>
          <input required placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-luxury" />
          <textarea required rows={6} placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-luxury" />
          <button type="submit" className="btn-luxury-primary">Send Message</button>
        </form>

        <div className="space-y-6">
          <div className="rounded-luxury border border-surface-border bg-white p-6">
            <div className="space-y-4 font-body text-sm text-black/65">
              <p className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 flex-shrink-0 text-gold-dark" /> {SITE_SETTINGS.address}</p>
              <p className="flex items-center gap-3"><Phone size={18} className="text-gold-dark" /> {SITE_SETTINGS.contactPhone}</p>
              <p className="flex items-center gap-3"><Mail size={18} className="text-gold-dark" /> {SITE_SETTINGS.contactEmail}</p>
            </div>
            <button onClick={() => toast.success("Live chat would open here")} className="btn-luxury-outline mt-5 w-full">
              <MessageCircle size={16} /> Start Live Chat
            </button>
          </div>

          <div className="overflow-hidden rounded-luxury border border-surface-border">
            <iframe
              title="H&S Watches location map"
              width="100%"
              height="220"
              loading="lazy"
              className="border-0"
              src="https://maps.google.com/maps?q=1%20Madison%20Avenue%20New%20York&t=&z=14&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </div>

      <div id="faq" className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-center font-display text-3xl font-semibold">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-luxury border border-surface-border bg-white">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left">
                <span className="font-display text-sm font-semibold">{faq.q}</span>
                <ChevronDown size={16} className={cn("flex-shrink-0 transition-transform", openFaq === i && "rotate-180")} />
              </button>
              {openFaq === i && <p className="px-5 pb-5 font-body text-sm text-black/60">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
