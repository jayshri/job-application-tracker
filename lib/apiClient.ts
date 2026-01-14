// create API client functions for applications 
import { JobApplication } from "./types";

// fetch all job applications via API
export async function apiGetApplications(): Promise<JobApplication[]> {
  const res = await fetch("/api/applications", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load applications");
  return res.json();
}
// create a new job application via API
export async function apiCreateApplication(
  app: Partial<JobApplication>
): Promise<JobApplication> {
  // POST to /api/applications with app data as JSON
  const res = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(app),
  });

  if (!res.ok) {
    const msg = await res.json().catch(() => ({}));
    throw new Error(msg?.error || "Failed to create application");
  }

  return res.json();
}
// fetch a single job application by ID via API
export async function apiGetApplication(id: string): Promise<JobApplication> {
  const res = await fetch(`/api/applications/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load application");
  return res.json();
}
// delete an existing job application via API
export async function apiDeleteApplication(id: string): Promise<void> {
  const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete application");
}