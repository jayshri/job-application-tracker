"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ApplicationStatus, JobApplication } from "../lib/types";
import { loadApplications, saveApplications } from "../lib/storage";

const STATUSES: ApplicationStatus[] = [
  "Wishlist",
  "Applied",
  "Recruiter Screen",
  "Interviewing",
  "Offer",
  "Rejected",
  "Archived",
];

export default function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "All">(
    "All"
  );

  useEffect(() => {
    const saved = loadApplications();
    setApplications(saved);
  }, []);

  const stats = useMemo(() => {
    const total = applications.length;

    const byStatus = applications.reduce<Record<string, number>>((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    return { total, byStatus };
  }, [applications]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return applications
      .filter((app) => {
        const matchesText =
          q === "" ||
          app.companyName.toLowerCase().includes(q) ||
          app.roleTitle.toLowerCase().includes(q);

        const matchesStatus =
          statusFilter === "All" || app.status === statusFilter;

        return matchesText && matchesStatus;
      })
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  }, [applications, search, statusFilter]);

  const addSample = () => {
    const now = new Date().toISOString();

    const sample: JobApplication = {
      id: crypto.randomUUID(),
      companyName: "Workday",
      roleTitle: "Frontend Engineer",
      location: "Alpharetta, GA",
      status: "Applied",
      createdAt: now,
      updatedAt: now,
      appliedDate: now,
      notes: "Sample application (for testing LocalStorage).",
    };

    const next = [sample, ...applications];
    setApplications(next);
    saveApplications(next);
  };

  const cardClass = "rounded-lg border p-4";
  const labelClass = "text-sm text-gray-600";
  const valueClass = "mt-1 text-2xl font-bold";

  return (
    <main className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Career Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track job applications, interviews, and offers.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/applications"
            className="rounded-md border px-3 py-2 text-sm"
          >
            View all
          </Link>

          <Link
            href="/applications/new"
            className="rounded-md bg-black px-3 py-2 text-sm text-white"
          >
            + New
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={cardClass}>
          <div className={labelClass}>Total</div>
          <div className={valueClass}>{stats.total}</div>
        </div>

        <div className={cardClass}>
          <div className={labelClass}>Applied</div>
          <div className={valueClass}>{stats.byStatus["Applied"] || 0}</div>
        </div>

        <div className={cardClass}>
          <div className={labelClass}>Interviewing</div>
          <div className={valueClass}>{stats.byStatus["Interviewing"] || 0}</div>
        </div>

        <div className={cardClass}>
          <div className={labelClass}>Offers</div>
          <div className={valueClass}>{stats.byStatus["Offer"] || 0}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
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

        <button
          onClick={addSample}
          className="w-full rounded-md bg-black px-4 py-2 text-white sm:w-auto"
        >
          Add sample
        </button>
      </div>

      {/* Recently updated (filtered) */}
      <div className="mt-8">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">Recently updated</h2>
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filtered.length}</span>
          </p>
        </div>

        <ul className="mt-3 space-y-2">
          {filtered.slice(0, 5).map((app) => (
            <li key={app.id} className="rounded-md border p-3">
              <Link href={`/applications/${app.id}`} className="block">
                <div className="font-semibold">
                  {app.companyName} — {app.roleTitle}
                </div>
                <div className="text-sm text-gray-600">
                  {app.status} • Updated {app.updatedAt.slice(0, 10)}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {applications.length === 0 && (
          <p className="mt-4 text-sm text-gray-600">
            No applications yet. Click <span className="font-medium">+ New</span>{" "}
            to add your first one.
          </p>
        )}

        {applications.length > 0 && filtered.length === 0 && (
          <p className="mt-4 text-sm text-gray-600">
            No results match your search/filter.
          </p>
        )}
      </div>
    </main>
  );
}