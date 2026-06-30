import Image from "next/image";
import Stars from "@/components/ui/stars";
import SectionHeading from "@/components/ui/section-heading";

const TESTIMONIALS = [
  {
    name: "James Whitfield",
    role: "Verified Buyer — Meridian Chronograph",
    rating: 5,
    text: "The level of finishing on the case is something I'd expect from a watch three times the price. The column-wheel chronograph action is buttery smooth.",
    avatar: "cust1",
  },
  {
    name: "Isabella Marchetti",
    role: "Verified Buyer — Calibre Noir",
    rating: 5,
    text: "I wear the Calibre Noir nearly every day now. It's thin enough to disappear under a cuff but somehow still feels substantial. Exceptional craftsmanship.",
    avatar: "cust4",
  },
  {
    name: "David Kim",
    role: "Verified Buyer — Abyssal Diver 300",
    rating: 4,
    text: "Took it diving in Cozumel and it performed exactly as advertised. The titanium case really does disappear on the wrist compared to my old steel diver.",
    avatar: "cust5",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <SectionHeading eyebrow="What Our Clients Say" title="Trusted by Collectors Worldwide" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-luxury p-6">
              <Stars rating={t.rating} />
              <p className="mt-4 font-body text-sm leading-relaxed text-black/70">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={`https://picsum.photos/seed/${t.avatar}/100/100`} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">{t.name}</p>
                  <p className="font-body text-xs text-black/45">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
