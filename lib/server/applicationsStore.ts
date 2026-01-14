import path from "path";
import { promises as fs } from "fs";
import { JobApplication } from "../types";

const DATA_FILE = path.join(process.cwd(), "data", "applications.json");

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function readApplications(): Promise<JobApplication[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as JobApplication[];
}

export async function writeApplications(apps: JobApplication[]): Promise<void> {
  await ensureFile();
  const raw = JSON.stringify(apps, null, 2);
  await fs.writeFile(DATA_FILE, raw, "utf-8");
}