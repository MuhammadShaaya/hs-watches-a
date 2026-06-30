"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { BLOG_POSTS } from "@/lib/data/misc";
import { formatDateShort } from "@/lib/format";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(BLOG_POSTS);

  function handleDelete(id: string, title: string) {
    setPosts(posts.filter((p) => p.id !== id));
    toast.success(`"${title}" deleted`);
  }

  function handleNew() {
    toast.success("Blog editor would open here");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Blog</h1>
          <p className="mt-1 font-body text-sm text-black/50">Manage journal articles.</p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 rounded-btn bg-luxury-black px-4 py-2.5 font-body text-xs font-semibold text-white">
          <Plus size={14} /> New Post
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-luxury border border-surface-border bg-white">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-surface-border text-left">
              <th className="p-4 font-body text-xs font-semibold text-black/45">Post</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Category</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Author</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Date</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Comments</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-surface-border last:border-0">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-14 flex-shrink-0 overflow-hidden rounded-lg"><Image src={p.featuredImage} alt={p.title} fill className="object-cover" /></div>
                    <span className="font-body text-sm font-medium">{p.title}</span>
                  </div>
                </td>
                <td className="p-4 font-body text-sm text-black/55">{p.category}</td>
                <td className="p-4 font-body text-sm text-black/55">{p.author}</td>
                <td className="p-4 font-body text-sm text-black/55">{formatDateShort(p.date)}</td>
                <td className="p-4 font-body text-sm text-black/55">{p.comments.length}</td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <button onClick={() => toast.success("Blog editor would open here")} className="text-black/40 hover:text-gold-dark"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(p.id, p.title)} className="text-black/40 hover:text-error"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
