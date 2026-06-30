import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-bold text-gold/30">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">Page Not Found</h1>
      <p className="mt-2 font-body text-sm text-black/50">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="btn-luxury-primary mt-6">Return Home</Link>
    </div>
  );
}
