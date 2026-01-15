import { kv } from "@vercel/kv";
import type { JobApplication } from "../types";

const KEY = "jobnest:applications";

export async function readApplications(): Promise<JobApplication[]> {
  const data = await kv.get<JobApplication[]>(KEY);
  return Array.isArray(data) ? data : [];
}

export async function writeApplications(apps: JobApplication[]) {
  await kv.set(KEY, apps);
}