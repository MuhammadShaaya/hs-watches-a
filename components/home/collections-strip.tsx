import Link from "next/link";
import Image from "next/image";

const COLLECTIONS = [
  { name: "Classic", slug: "classic", seed: "coll-classic" },
  { name: "Sport", slug: "sport", seed: "coll-sport" },
  { name: "Chronograph", slug: "chronograph", seed: "coll-chrono" },
  { name: "Smart Luxury", slug: "smart-luxury", seed: "coll-smart" },
  { name: "Limited Edition", slug: "limited-edition", seed: "coll-limited" },
];

export default function CollectionsStrip() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow text-gold-dark">Shop by Collection</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Five Collections, One Standard</h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:gap-5 sm:overflow-visible">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?collection=${c.slug}`}
              className="group relative w-40 flex-shrink-0 overflow-hidden rounded-luxury sm:w-auto"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${c.seed}/500/500`}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-luxury-black/35 transition group-hover:bg-luxury-black/20" />
              </div>
              <p className="absolute bottom-4 left-4 font-display text-lg font-semibold text-white drop-shadow">
                {c.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
