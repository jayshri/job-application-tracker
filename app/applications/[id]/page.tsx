"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { JobApplication } from "../../../lib/types";
import { apiDeleteApplication, apiGetApplication } from "../../../lib/apiClient";

export default function ApplicationDetailsPage() {
  const params = useParams<{ id: string }>(); // reads dynamic URL values
  const id = params?.id; // get application ID from URL

  const router = useRouter();

  const [application, setApplication] = useState<JobApplication | null>(null);
  //Loads from LocalStorage when id is available
  useEffect(() => {
    if (!id) return;

    apiGetApplication(id)
      .then((found) => {
        //if found, set it to state
        setApplication(found);
      })
      .catch(() => setApplication(null));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const ok = window.confirm("Delete this application? This cannot be undone.");
    if (!ok) return;

    try {
      await apiDeleteApplication(id);
      router.push("/applications");
    } catch (err) {
      console.error(err);
      alert("Delete failed. Please try again.");
    }
  };

  // if id is not yet available, show loading state
  if (!id) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">Application</div>
          <Link href="/applications" className="text-sm text-slate-600 underline">
            ← Back to applications
          </Link>
        </div>
        <p className="mt-6 text-slate-600">Loading...</p>
      </main>
    );
  }
  // if application is not found, show not found message
  if (!application) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">Application</div>
          <Link href="/applications" className="text-sm text-slate-600 underline">
            ← Back to applications
          </Link>
        </div>
        <p className="mt-6 text-slate-600">Application not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          {application.companyName} — {application.roleTitle}
        </h1>

        <Link href="/applications" className="text-sm text-slate-600 underline">
          ← Back to applications
        </Link>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">
            Status:{" "}
            <span className="font-medium text-slate-900">
              {application.status}
            </span>
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <div>
              <span className="font-medium text-slate-900">Location:</span>{" "}
              {application.location || "—"}
            </div>

            <div>
              <span className="font-medium text-slate-900">Applied Date:</span>{" "}
              {application.appliedDate
                ? application.appliedDate.slice(0, 10)
                : "—"}
            </div>

            <div>
              <span className="font-medium text-slate-900">Job URL:</span>{" "}
              {application.jobUrl ? (
                <a
                  className="text-emerald-600 underline hover:text-emerald-700"
                  href={application.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open posting
                </a>
              ) : (
                "—"
              )}
            </div>

            <div>
              <span className="font-medium text-slate-900">Notes:</span>{" "}
              {application.notes || "—"}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
            <Link
              href={`/applications/${id}/edit`}
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}