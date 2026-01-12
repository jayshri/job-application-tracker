import { JobApplication } from "./types";

const STORAGE_KEY = "job-tracker-applications";

/**
 * Load all job applications from localStorage.
 */
export function loadApplications(): JobApplication[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as JobApplication[];
  } catch {
    return [];
  }
}

/**
 * Save all job applications to localStorage.
 */
export function saveApplications(applications: JobApplication[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}