import Image from "next/image";

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-[calc(100vh-80px)] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image src="https://picsum.photos/seed/auth-watch/1200/1600" alt="H&S Watches" fill className="object-cover" />
        <div className="absolute inset-0 bg-luxury-black/40" />
        <div className="absolute bottom-12 left-12 max-w-sm">
          <p className="font-display text-3xl font-semibold text-white">Time, Refined.</p>
          <p className="mt-3 font-body text-sm text-white/70">
            Join a community of collectors who demand more from the watch on their wrist.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          <p className="mt-2 font-body text-sm text-black/55">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
