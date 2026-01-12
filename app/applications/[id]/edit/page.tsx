"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ApplicationStatus, JobApplication } from "../../../../lib/types";
import { loadApplications, saveApplications } from "../../../../lib/storage";

const STATUSES: ApplicationStatus[] = [
  "Wishlist",
  "Applied",
  "Recruiter Screen",
  "Interviewing",
  "Offer",
  "Rejected",
  "Archived",
];

export default function EditApplicationPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params?.id;

  const [application, setApplication] = useState<JobApplication | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Wishlist");
  const [jobUrl, setJobUrl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!id) return;

    // get all applications from LocalStorage and find application by ID
    const all = loadApplications();
    const found = all.find((a) => a.id === id) || null;

    setApplication(found);
    // if application found then set individual state fields
    if (found) {
      setCompanyName(found.companyName);
      setRoleTitle(found.roleTitle);
      setLocation(found.location);
      setStatus(found.status);
      setJobUrl(found.jobUrl ?? "");
      setNotes(found.notes ?? "");
    }
  }, [id]);

  // on form submit, update the application in LocalStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const all = loadApplications();
    const now = new Date().toISOString();

    const next = all.map((a) => {
      if (a.id !== id) return a;

      return {
        ...a,
        companyName: companyName.trim(),
        roleTitle: roleTitle.trim(),
        location: location.trim(),
        status,
        jobUrl: jobUrl.trim() || undefined,
        notes: notes.trim() || undefined,
        updatedAt: now,
      };
    });

    saveApplications(next);

    router.push(`/applications/${id}`);
  };

  if (!id) {
    return (
      <main className="min-h-screen p-6">
        <p>Loading...</p>
      </main>
    );
  }

  if (!application) {
    return (
      <main className="min-h-screen p-6">
        <Link href="/applications" className="text-sm underline">
          ← Back to applications
        </Link>
        <p className="mt-6">Application not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Application</h1>

        <Link href={`/applications/${id}`} className="text-sm underline">
          ← Back to details
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
          Save changes
        </button>
      </form>
    </main>
  );
}