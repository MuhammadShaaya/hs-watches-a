import { Category, Brand, Coupon, BlogPost } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "c1", name: "Classic", slug: "classic", productCount: 5 },
  { id: "c2", name: "Sport", slug: "sport", productCount: 4 },
  { id: "c3", name: "Chronograph", slug: "chronograph", productCount: 2 },
  { id: "c4", name: "Smart Luxury", slug: "smart-luxury", productCount: 1 },
  { id: "c5", name: "Limited Edition", slug: "limited-edition", productCount: 4 },
];

export const BRANDS: Brand[] = [
  { id: "b1", name: "H&S Watches", slug: "hs-watches", productCount: 16 },
];

export const COUPONS: Coupon[] = [
  { id: "co1", code: "WELCOME10", type: "percentage", value: 10, expiry: "2026-12-31", usageLimit: 500, usedCount: 213, active: true },
  { id: "co2", code: "SAVE250", type: "fixed", value: 250, expiry: "2026-09-30", usageLimit: 200, usedCount: 88, active: true },
  { id: "co3", code: "VIP20", type: "percentage", value: 20, expiry: "2026-08-15", usageLimit: 50, usedCount: 41, active: true },
  { id: "co4", code: "SUMMER24", type: "percentage", value: 15, expiry: "2025-09-01", usageLimit: 300, usedCount: 300, active: false },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "bp1",
    slug: "anatomy-of-a-chronograph",
    title: "The Anatomy of a Chronograph: What Sets a Great One Apart",
    excerpt: "From column wheels to flyback functions, we break down the mechanism that turned pocket-watch complications into the wrist's most useful tool.",
    content:
      "A chronograph is, at its simplest, a stopwatch grafted onto a timekeeping watch. But the difference between a good chronograph and a great one lies almost entirely in the switching mechanism that starts, stops, and resets it.\n\nMost affordable chronographs use a cam-actuated system: simple, reliable, but with a noticeable mechanical 'thunk' when engaged. Column-wheel chronographs, by contrast, use a wheel with raised columns that lift and lower the chronograph levers with a much lighter, more precise action — the kind of refinement collectors pay a premium for.\n\nOur Meridian Automatic Chronograph uses a column-wheel system visible through its exhibition caseback, a deliberate choice to let owners see exactly what they're paying for.",
    category: "Horology",
    tags: ["chronograph", "movements", "craftsmanship"],
    featuredImage: "https://picsum.photos/seed/blog-chrono/1200/700",
    author: "Layla Hassan",
    date: "2026-04-02T00:00:00.000Z",
    comments: [
      { id: "cm1", name: "Marcus Webb", comment: "Great breakdown — never understood the column-wheel difference until now.", date: "2026-04-04T00:00:00.000Z" },
      { id: "cm2", name: "Priya Patel", comment: "This is why I went with the Meridian over a cheaper cam-based chrono.", date: "2026-04-05T00:00:00.000Z" },
    ],
  },
  {
    id: "bp2",
    slug: "titanium-vs-steel",
    title: "Titanium vs. Steel: Choosing Your Watch Case Material",
    excerpt: "Weight, hypoallergenic properties, and finishing all factor into the steel-versus-titanium debate. Here's how we think about it.",
    content:
      "Stainless steel has been the default watch case material for over a century, and for good reason: it takes a polish beautifully, resists corrosion, and has enough heft to feel substantial on the wrist.\n\nTitanium entered serious watchmaking later, prized initially by dive watch makers for its strength-to-weight ratio. A titanium case can be 30-40% lighter than an equivalent steel one, which matters enormously on a 44mm dive watch worn for hours at a time.\n\nThe tradeoff is finishing: titanium doesn't take a mirror polish as readily as steel, which is why many titanium cases lean toward brushed or sandblasted finishes. Neither material is objectively superior — it depends on whether you prioritize wrist presence or all-day comfort.",
    category: "Materials",
    tags: ["titanium", "steel", "case materials"],
    featuredImage: "https://picsum.photos/seed/blog-titanium/1200/700",
    author: "Shabbir Ahmed Khan",
    date: "2026-03-18T00:00:00.000Z",
    comments: [
      { id: "cm3", name: "Daniel Ortiz", comment: "Switched to titanium after years of steel and never looked back for daily wear.", date: "2026-03-20T00:00:00.000Z" },
    ],
  },
  {
    id: "bp3",
    slug: "caring-for-your-luxury-watch",
    title: "Five Habits That Will Add Decades to Your Watch's Life",
    excerpt: "A luxury watch is built to be worn for generations — provided it's cared for properly. Here's what actually matters.",
    content:
      "The single biggest threat to most mechanical watches isn't impact — it's moisture. Always confirm your watch's water resistance rating before swimming or showering, and never operate the crown while the watch is wet or submerged.\n\nService your movement every 4-6 years even if it appears to be running fine; lubricants degrade silently long before a watch visibly slows down. Store watches you're not wearing in a cool, dry place away from direct sunlight, which can fade dials over time.\n\nFinally, avoid magnets. Modern life is full of them — phone cases, laptop latches, handbag clasps — and exposure can magnetize a movement's hairspring, causing it to run fast without any visible damage.",
    category: "Care & Maintenance",
    tags: ["maintenance", "care guide", "longevity"],
    featuredImage: "https://picsum.photos/seed/blog-care/1200/700",
    author: "Layla Hassan",
    date: "2026-02-25T00:00:00.000Z",
    comments: [],
  },
];

export const SITE_SETTINGS = {
  storeName: "H&S Watches",
  tagline: "Time, Refined.",
  currency: "USD" as const,
  currencySymbol: "$",
  freeShippingThreshold: 0,
  contactEmail: "concierge@hswatches.com",
  contactPhone: "+1 (800) 555-0142",
  address: "1 Madison Avenue, Suite 1200, New York, NY 10010",
  socialLinks: {
    instagram: "https://instagram.com/hswatches",
    facebook: "https://facebook.com/hswatches",
    pinterest: "https://pinterest.com/hswatches",
  },
  taxRate: 0.08,
};
