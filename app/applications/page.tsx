"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JobApplication, ApplicationStatus } from "../../lib/types";
import { loadApplications } from "../../lib/storage";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "All">("All");

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
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Link
          href="/applications/new"
          className="rounded-md bg-black px-3 py-2 text-sm text-white"
        >
          + New
        </Link>
        <Link href="/" className="text-sm underline">
          ← Back to dashboard
        </Link>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        Total: <span className="font-semibold">{filtered.length}</span>
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="w-full rounded-md border p-2 sm:max-w-sm"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full rounded-md border p-2 sm:max-w-xs"
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

      <ul className="mt-6 space-y-2">
        {filtered.map((app) => (
          <li key={app.id} className="rounded-md border p-3">
            <Link href={`/applications/${app.id}`} className="block">
              <div className="font-semibold">
                {app.companyName} — {app.roleTitle}
              </div>
              <div className="text-sm text-gray-600">
                {app.status} • {app.location}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}