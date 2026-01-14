"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ApplicationStatus, JobApplication } from "../../../../lib/types";
import { apiGetApplication, apiUpdateApplication } from "../../../../lib/apiClient";

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
  const [appliedDate, setAppliedDate] = useState("");

  useEffect(() => {
    if (!id) return;

    // get all applications from LocalStorage and find application by ID
    apiGetApplication(id)
      .then((found) => {
        setApplication(found);
        // if application found then set individual state fields
        setCompanyName(found.companyName);
        setRoleTitle(found.roleTitle);
        setLocation(found.location);
        setStatus(found.status);
        setJobUrl(found.jobUrl ?? "");
        setNotes(found.notes ?? "");
        setAppliedDate(found.appliedDate ? found.appliedDate.slice(0, 10) : "");
      })
      .catch(() => setApplication(null));
  }, [id]);

  // on form submit, update the application in LocalStorage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await apiUpdateApplication(id, {
        companyName: companyName.trim(),
        roleTitle: roleTitle.trim(),
        location: location.trim(),
        status,
        jobUrl: jobUrl.trim() || undefined,
        notes: notes.trim() || undefined,
        appliedDate: appliedDate ? new Date(appliedDate).toISOString() : undefined,
      });

      router.push(`/applications/${id}`);
    } catch (err) {
      console.error(err);
      alert("Save failed. Please try again.");
    }
  };

  if (!id) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <p className="text-slate-600">Loading...</p>
      </main>
    );
  }

  if (!application) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <Link href="/applications" className="text-sm text-slate-600 underline">
          ← Back to applications
        </Link>
        <p className="mt-6 text-slate-600">Application not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Edit Application</h1>

        <Link
          href={`/applications/${id}`}
          className="text-sm text-slate-600 underline"
        >
          ← Back to details
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
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
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
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
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
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
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
              className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
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
            Save changes
          </button>
        </form>
      </div>
    </main>
  );
}