"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JobApplication, ApplicationStatus } from "../../lib/types";
import { loadApplications } from "../../lib/storage";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<ApplicationStatus | "All">("All");

  useEffect(() => {
    setApplications(loadApplications());
  }, []);

  const filtered = applications
    .filter((app) => {
      const q = search.trim().toLowerCase();
      const matchesText =
        q === "" ||
        app.companyName.toLowerCase().includes(q) ||
        app.roleTitle.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter;

      return matchesText && matchesStatus;
    })
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

  const STATUSES: ApplicationStatus[] = [
    "Wishlist",
    "Applied",
    "Recruiter Screen",
    "Interviewing",
    "Offer",
    "Rejected",
    "Archived",
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          Applications
        </h1>

        <Link
          href="/applications/new"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          + New
        </Link>

        <Link href="/" className="text-sm text-slate-600 underline">
          ← Back to dashboard
        </Link>
      </div>

      <p className="mt-2 text-sm text-slate-600">
        Total: <span className="font-semibold">{filtered.length}</span>
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 placeholder-slate-500 focus:border-emerald-500 focus:outline-none sm:max-w-sm"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none sm:max-w-xs"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="All">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <ul className="mt-6 space-y-3">
        {filtered.map((app) => (
          <li
            key={app.id}
            className="rounded-md border border-slate-200 bg-white p-4 hover:shadow-sm"
          >
            <Link href={`/applications/${app.id}`} className="block">
              <div className="font-semibold text-slate-900">
                {app.companyName} — {app.roleTitle}
              </div>
              <div className="mt-1 text-sm text-slate-600">
                {app.status} • {app.location}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}