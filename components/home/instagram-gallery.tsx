import Image from "next/image";
import { Instagram } from "lucide-react";

const SEEDS = ["ig1", "ig2", "ig3", "ig4", "ig5", "ig6"];

export default function InstagramGallery() {
  return (
    <section className="bg-luxury-black py-20">
      <div className="container text-center">
        <p className="eyebrow text-gold">@hswatches</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">As Worn by Our Community</h2>
        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {SEEDS.map((s) => (
            <a
              key={s}
              href="https://instagram.com/hswatches"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image src={`https://picsum.photos/seed/${s}/400/400`} alt="H&S Watches on Instagram" fill className="object-cover transition group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-luxury-black/0 transition group-hover:bg-luxury-black/50">
                <Instagram size={20} className="text-white opacity-0 transition group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
