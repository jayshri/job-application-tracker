"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JobApplication } from "../../lib/types";
import { loadApplications } from "../../lib/storage";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    setApplications(loadApplications());
  }, []);

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
        Total: <span className="font-semibold">{applications.length}</span>
      </p>

      <ul className="mt-6 space-y-2">
        {applications.map((app) => (
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