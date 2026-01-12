"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { JobApplication } from "../../../lib/types";
import { loadApplications, saveApplications } from "../../../lib/storage";

export default function ApplicationDetailsPage() {
  const params = useParams<{ id: string }>(); // reads dynamic URL values
  const id = params?.id; // get application ID from URL

  const router = useRouter();

  const [application, setApplication] = useState<JobApplication | null>(null);
  //Loads from LocalStorage when id is available
  useEffect(() => {
    if (!id) return;

    const all = loadApplications();
    const found = all.find((a) => a.id === id) || null;
    //if found, set it to state
    setApplication(found);
  }, [id]);

  const handleDelete = () => {
    if (!id) return;
    const ok = window.confirm("Delete this application? This cannot be undone.");
    if (!ok) return;

    const all = loadApplications();
    const next = all.filter((a) => a.id !== id);

    saveApplications(next);
    router.push("/applications");
};

  // if id is not yet available, show loading state
  if (!id) {
    return (
      <main className="min-h-screen p-6">
        <Link href="/applications" className="text-sm underline">
          ← Back to applications
        </Link>
        <p className="mt-6">Loading...</p>
      </main>
    );
  }
  // if application is not found, show not found message
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
      <Link href="/applications" className="text-sm underline">
        ← Back to applications
      </Link>

      <h1 className="mt-4 text-2xl font-bold">
        {application.companyName} — {application.roleTitle}
      </h1>
      <Link
            href={`/applications/${id}/edit`}
            className="mt-4 inline-block rounded-md bg-black px-3 py-2 text-sm text-white"
            >
            Edit
      </Link>
      <button
        onClick={handleDelete}
        className="mt-4 ml-3 inline-block rounded-md border px-3 py-2 text-sm"
        >
        Delete
      </button>

      <p className="mt-2 text-sm text-gray-600">
        Status: <span className="font-semibold">{application.status}</span>
      </p>

      <div className="mt-6 space-y-2">
        <div>
          <span className="font-medium">Location:</span>{" "}
          {application.location || "—"}
        </div>

        <div>
          <span className="font-medium">Applied Date:</span>{" "}
          {application.appliedDate ? application.appliedDate.slice(0, 10) : "—"}
        </div>

        <div>
          <span className="font-medium">Job URL:</span>{" "}
          {application.jobUrl ? (
            <a
              className="underline"
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
          <span className="font-medium">Notes:</span> {application.notes || "—"}
        </div>
      </div>
    </main>
  );
}