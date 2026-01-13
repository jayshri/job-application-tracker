"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { ApplicationStatus } from "../../../lib/types";
import { useRouter } from "next/navigation";
import { JobApplication } from "../../../lib/types";
import { loadApplications, saveApplications } from "../../../lib/storage";

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
  const [appliedDate, setAppliedDate] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toISOString();

    const newApp: JobApplication = {
      id: crypto.randomUUID(),
      companyName: companyName.trim(),
      roleTitle: roleTitle.trim(),
      location: location.trim(),
      status,
      jobUrl: jobUrl.trim() || undefined,
      notes: notes.trim() || undefined,
      appliedDate: appliedDate ? new Date(appliedDate).toISOString() : undefined,
      createdAt: now,
      updatedAt: now,
    };

    const current = loadApplications();
    const next = [newApp, ...current];

    saveApplications(next);
    // once the new application is saved, navigate back to the applications list
    if (router?.push) {
      router.push("/applications");
    } else {
      window.location.assign("/applications");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">New Application</h1>

        <Link href="/applications" className="text-sm text-slate-600 underline">
          ← Back to applications
        </Link>
      </div>

      <div className="mt-6 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl space-y-4 rounded-lg border border-slate-200 bg-white p-6"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Company
            </label>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Role
            </label>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Location
            </label>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Alpharetta, GA (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
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
            <label className="block text-sm font-medium text-slate-700">
              Applied date
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Job URL
            </label>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Notes
            </label>
            <textarea
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Anything to remember..."
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Save
          </button>
        </form>
      </div>
    </main>
  );
}