"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  GraduationCap,
  Upload,
  X,
  BookOpen,
  Tag,
  Edit2,
  Check,
} from "lucide-react";

interface Formation {
  id: string;
  name: string;
  imageUrl: string;
  category: string | null;
  notes: string | null;
  createdAt: string;
}

// ─── Add Formation Modal ─────────────────────────────────────────────────────
function AddFormationModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  }

  async function handleSave() {
    if (!name.trim()) { setError("Formation name is required."); return; }
    if (!file) { setError("Please select an image."); return; }
    setSaving(true);
    setError("");
    try {
      // 1. Upload image
      const fd = new FormData();
      fd.append("file", file);
      const upRes = await fetch("/api/formations/upload", { method: "POST", body: fd });
      if (!upRes.ok) { const d = await upRes.json(); throw new Error(d.error || "Upload failed"); }
      const { imageUrl } = await upRes.json();

      // 2. Save formation record
      const saveRes = await fetch("/api/formations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), imageUrl, category: category.trim(), notes: notes.trim() }),
      });
      if (!saveRes.ok) { const d = await saveRes.json(); throw new Error(d.error || "Save failed"); }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Add New Formation</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Formation Image <span className="text-red-400">*</span>
            </label>
            {preview ? (
              <div className="relative rounded-lg overflow-hidden border border-slate-600 bg-slate-800">
                <Image src={preview} alt="preview" width={480} height={200} className="w-full object-contain max-h-48" />
                <button
                  onClick={() => { setFile(null); setPreview(null); }}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-slate-600 hover:border-green-500 rounded-lg p-8 text-center cursor-pointer transition-colors"
              >
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Click or drag & drop an image</p>
                <p className="text-xs text-slate-500 mt-1">JPG, PNG, GIF, WEBP, SVG</p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Formation Name <span className="text-red-400">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 2x2, 3x1 Trips, Empty, Spread"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Offense, Defense, Special Teams"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 text-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Coach Notes <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any extra info about this formation..."
              rows={2}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 text-sm resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {saving ? "Saving..." : "Save Formation"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Formation Card ───────────────────────────────────────────────────────────
function FormationCard({
  formation,
  onDelete,
  onUpdated,
}: {
  formation: Formation;
  onDelete: (id: string) => void;
  onUpdated: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(formation.name);
  const [editCategory, setEditCategory] = useState(formation.category ?? "");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function saveEdit() {
    if (!editName.trim()) return;
    setSaving(true);
    await fetch(`/api/formations/${formation.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName.trim(), category: editCategory.trim() }),
    });
    setSaving(false);
    setEditing(false);
    onUpdated();
  }

  async function handleDelete() {
    await fetch(`/api/formations/${formation.id}`, { method: "DELETE" });
    onDelete(formation.id);
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden group hover:border-slate-500 transition-colors">
      {/* Image */}
      <div className="relative bg-slate-900 h-44 flex items-center justify-center">
        <Image
          src={formation.imageUrl}
          alt={formation.name}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        {editing ? (
          <div className="space-y-2">
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-slate-700 border border-slate-500 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:border-green-500"
              autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditing(false); }}
            />
            <input
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              placeholder="Category (optional)"
              className="w-full bg-slate-700 border border-slate-500 rounded-lg px-2 py-1 text-slate-300 text-xs focus:outline-none focus:border-green-500"
            />
            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                disabled={saving}
                className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
              >
                <Check className="w-3 h-3" /> Save
              </button>
              <button
                onClick={() => { setEditing(false); setEditName(formation.name); setEditCategory(formation.category ?? ""); }}
                className="px-3 py-1 text-slate-400 hover:text-white text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-white truncate text-sm">{formation.name}</h3>
                {formation.category && (
                  <span className="inline-flex items-center gap-1 text-xs text-green-400 mt-1">
                    <Tag className="w-3 h-3" />
                    {formation.category}
                  </span>
                )}
                {formation.notes && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{formation.notes}</p>
                )}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                  onClick={() => setEditing(true)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                {confirmDelete ? (
                  <button
                    onClick={handleDelete}
                    className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-900/30 transition-colors text-xs font-medium"
                    title="Confirm delete"
                  >
                    Sure?
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    onBlur={() => setTimeout(() => setConfirmDelete(false), 200)}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Library Page ────────────────────────────────────────────────────────
export default function FormationsLibrary() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/formations");
    const data = await res.json();
    setFormations(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function handleDelete(id: string) {
    setFormations((prev) => prev.filter((f) => f.id !== id));
  }

  const filtered = formations.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      (f.category ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // Group by category
  const categories = Array.from(new Set(filtered.map((f) => f.category ?? "Uncategorized")));

  return (
    <>
      {showAdd && <AddFormationModal onClose={() => setShowAdd(false)} onSaved={load} />}

      <div className="space-y-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-700 via-green-800 to-slate-900 p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-green-200" />
              <span className="text-green-200 text-sm font-medium uppercase tracking-wider">
                ANSRS Analytics
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Formation Library</h1>
            <p className="text-green-100/80 text-lg max-w-2xl mb-6">
              Add formation images and their correct names to build your terminology library.
              Then use Study Mode to drill coaches until they know every formation cold.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowAdd(true)}
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Formation
              </button>
              {formations.length > 0 && (
                <Link
                  href="/formations/study"
                  className="inline-flex items-center gap-2 bg-slate-900/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-900/70 transition-colors border border-green-400/30"
                >
                  <GraduationCap className="w-5 h-5" />
                  Start Studying
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{formations.length}</p>
            <p className="text-xs text-slate-400 mt-1">Total Formations</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-2xl font-bold text-white">
              {new Set(formations.map((f) => f.category ?? "Uncategorized")).size}
            </p>
            <p className="text-xs text-slate-400 mt-1">Categories</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 col-span-2 sm:col-span-1">
            <p className="text-2xl font-bold text-white">
              {formations.length >= 2 ? "Ready" : formations.length === 1 ? "Need 1 more" : "Empty"}
            </p>
            <p className="text-xs text-slate-400 mt-1">Study Status</p>
          </div>
        </div>

        {/* Search + Grid */}
        {formations.length > 0 ? (
          <div className="space-y-6">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formations by name or category..."
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
            />

            {categories.map((cat) => {
              const catFormations = filtered.filter((f) => (f.category ?? "Uncategorized") === cat);
              if (catFormations.length === 0) return null;
              return (
                <div key={cat}>
                  <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    {cat} ({catFormations.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {catFormations.map((f) => (
                      <FormationCard
                        key={f.id}
                        formation={f}
                        onDelete={handleDelete}
                        onUpdated={load}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <p className="text-center text-slate-500 py-12">No formations match your search.</p>
            )}
          </div>
        ) : loading ? (
          <div className="text-center py-20 text-slate-500">Loading...</div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No formations yet</h3>
            <p className="text-slate-400 mb-6 max-w-sm mx-auto">
              Start by adding your first formation. Upload a diagram image and give it the correct name.
            </p>
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your First Formation
            </button>
          </div>
        )}
      </div>
    </>
  );
}
