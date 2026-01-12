"use client";

import Link from "next/link";
import { useState } from "react";
import { ApplicationStatus } from "../../../lib/types";

const STATUSES: ApplicationStatus[] = [
  "Wishlist",
  "Applied",
  "Recruiter Screen",
  "Interviewing",
  "Offer",
  "Rejected",
  "Archived",
];

export default function NewApplicationPage() {
  const [companyName, setCompanyName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Wishlist");
  const [jobUrl, setJobUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      companyName,
      roleTitle,
      location,
      status,
      jobUrl,
      notes,
    });
  };

  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">New Application</h1>

        <Link href="/applications" className="text-sm underline">
          ← Back to applications
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium">Company</label>
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Alpharetta, GA (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="mt-1 w-full rounded-md border p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Job URL</label>
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea
            className="mt-1 w-full rounded-md border p-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Anything to remember..."
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Save (temporary)
        </button>
      </form>
    </main>
  );
}