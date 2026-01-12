"use client";

import { useEffect, useState } from "react";
import { JobApplication } from "../lib/types";
import { loadApplications, saveApplications } from "../lib/storage";
import Link from "next/link";

export default function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const saved = loadApplications();
    setApplications(saved);
  }, []);

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

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Job Tracker</h1>
      <Link href="/applications" className="mt-3 inline-block text-sm underline">
         View all applications →
      </Link>

      <p className="mt-2 text-sm text-gray-600">
        Total applications: <span className="font-semibold">{applications.length}</span>
      </p>

      <button
        onClick={addSample}
        className="mt-4 rounded-md bg-black px-4 py-2 text-white"
      >
        Add sample application
      </button>

      <ul className="mt-6 space-y-2">
        {applications.map((app) => (
          <li key={app.id} className="rounded-md border p-3">
            <div className="font-semibold">
              {app.companyName} — {app.roleTitle}
            </div>
            <div className="text-sm text-gray-600">
              {app.status} • {app.location}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}