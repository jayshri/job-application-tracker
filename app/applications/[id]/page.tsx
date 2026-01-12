"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { JobApplication } from "../../../lib/types";
import { loadApplications } from "../../../lib/storage";

export default function ApplicationDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [application, setApplication] = useState<JobApplication | null>(null);

  useEffect(() => {
    if (!id) return;

    const all = loadApplications();
    const found = all.find((a) => a.id === id) || null;
    setApplication(found);
  }, [id]);

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