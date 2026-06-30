import Image from "next/image";
import { Gem, Target, Eye, Hammer } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

const TIMELINE = [
  { year: "2019", title: "The Atelier Opens", desc: "H&S Watches founded with a single goal: build watches that rival the old houses, without the old-house markup." },
  { year: "2021", title: "First In-House Movement", desc: "Launched our Cal. HS-400 column-wheel chronograph, designed and assembled entirely in-house." },
  { year: "2023", title: "300m Dive Certification", desc: "The Abyssal Diver collection became our first ISO-certified professional dive watches." },
  { year: "2025", title: "The Tourbillon Era", desc: "Introduced the Monarch — our first flying tourbillon, hand-assembled over six weeks per piece." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex h-[60vh] items-center bg-black-sheen">
        <Image src="https://picsum.photos/seed/about-hero/1920/1000" alt="H&S Watches atelier" fill className="object-cover opacity-40" />
        <div className="container relative z-10 text-center">
          <p className="eyebrow text-gold">Our Story</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">Built to Outlast a Generation</h1>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container max-w-3xl text-center">
          <p className="font-body text-base leading-relaxed text-black/65">
            H&amp;S Watches was founded on a simple frustration: that true watchmaking craftsmanship had become locked behind names with three-comma price tags. We set out to prove that hand-finishing, in-house movements, and genuine materials could exist at a price collectors could actually justify — without cutting a single corner on quality.
          </p>
        </div>

        <div className="container mt-16 grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <Target className="mx-auto text-gold-dark" size={28} />
            <p className="mt-3 font-display text-lg font-semibold">Our Mission</p>
            <p className="mt-2 font-body text-sm text-black/55">Make exceptional watchmaking accessible without compromising on materials, movement quality, or finishing.</p>
          </div>
          <div className="text-center">
            <Eye className="mx-auto text-gold-dark" size={28} />
            <p className="mt-3 font-display text-lg font-semibold">Our Vision</p>
            <p className="mt-2 font-body text-sm text-black/55">A world where a watch's value is measured by its craftsmanship — not by which boutique it sits in.</p>
          </div>
          <div className="text-center">
            <Gem className="mx-auto text-gold-dark" size={28} />
            <p className="mt-3 font-display text-lg font-semibold">Our Promise</p>
            <p className="mt-2 font-body text-sm text-black/55">Every watch ships with a lifetime authentication guarantee and a warranty that actually means something.</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-bg py-20">
        <div className="container">
          <SectionHeading eyebrow="Craftsmanship" title="How We Build" description="Every H&S watch passes through the hands of fewer than twelve people before it reaches yours." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Movement Assembly", desc: "Hand-assembled and regulated under magnification" },
              { step: "02", title: "Case Finishing", desc: "Hand-polished, brushed, and sandblasted by trained finishers" },
              { step: "03", title: "Dial Application", desc: "Indices and hands individually set and aligned" },
              { step: "04", title: "Quality Control", desc: "72-hour timing test before any watch ships" },
            ].map((s) => (
              <div key={s.step} className="rounded-luxury border border-surface-border bg-white p-6">
                <p className="font-display text-3xl font-bold text-gold/40">{s.step}</p>
                <p className="mt-3 font-display text-base font-semibold">{s.title}</p>
                <p className="mt-2 font-body text-sm text-black/55">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container">
          <SectionHeading eyebrow="Our Journey" title="A Brief Timeline" />
          <div className="mx-auto mt-12 max-w-2xl space-y-8 border-l border-surface-border pl-8">
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative">
                <div className="absolute -left-[34px] top-1 h-3 w-3 rounded-full bg-gold" />
                <p className="font-display text-sm font-bold text-gold-dark">{t.year}</p>
                <p className="mt-1 font-display text-lg font-semibold">{t.title}</p>
                <p className="mt-1 font-body text-sm text-black/55">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="warranty" className="border-t border-surface-border bg-surface-bg py-16">
        <div className="container max-w-2xl text-center">
          <Hammer className="mx-auto text-gold-dark" size={28} />
          <h2 className="mt-3 font-display text-2xl font-semibold">Warranty &amp; Authentication</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-black/60">
            Every H&amp;S watch ships with a minimum 3-year international warranty (up to 10 years on select pieces), covering manufacturing defects in materials and movement, plus a lifetime authentication guarantee tied to your watch&apos;s unique serial number.
          </p>
        </div>
      </section>
    </div>
  );
}
