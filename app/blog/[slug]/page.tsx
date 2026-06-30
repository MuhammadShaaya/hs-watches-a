"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/misc";
import { formatDate } from "@/lib/format";
import toast from "react-hot-toast";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  const [comments, setComments] = useState(post?.comments ?? []);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  if (!post) return notFound();

  function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error("Please fill in your name and comment.");
      return;
    }
    setComments([...comments, { id: `c-${Date.now()}`, name, comment, date: new Date().toISOString() }]);
    setName("");
    setComment("");
    toast.success("Comment posted");
  }

  return (
    <article className="container max-w-3xl py-14">
      <Link href="/blog" className="font-body text-sm text-gold-dark hover:text-gold">← Back to Journal</Link>

      <p className="mt-6 font-body text-[11px] uppercase tracking-luxe text-gold-dark">{post.category}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{post.title}</h1>
      <p className="mt-3 font-body text-sm text-black/45">{post.author} · {formatDate(post.date)}</p>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-luxury">
        <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
      </div>

      <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-black/70">
        {post.content.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded-full bg-surface-bg px-3 py-1 font-body text-[11px] capitalize text-black/50">{t}</span>
        ))}
      </div>

      <div className="mt-14 border-t border-surface-border pt-10">
        <h2 className="font-display text-xl font-semibold">Comments ({comments.length})</h2>
        <div className="mt-6 space-y-5">
          {comments.map((c) => (
            <div key={c.id} className="rounded-luxury border border-surface-border bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold">{c.name}</p>
                <p className="font-body text-xs text-black/40">{formatDate(c.date)}</p>
              </div>
              <p className="mt-2 font-body text-sm text-black/65">{c.comment}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitComment} className="mt-6 space-y-3 rounded-luxury border border-surface-border bg-white p-5">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="input-luxury" />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." rows={3} className="input-luxury" />
          <button type="submit" className="btn-luxury-primary">Post Comment</button>
        </form>
      </div>
    </article>
  );
}
