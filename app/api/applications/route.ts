// Handler for GET and POST /api/applications
import { NextResponse } from "next/server";
import { readApplications, writeApplications } from "../../../lib/server/kvStorage";
import { JobApplication } from "../../../lib/types";

export const runtime = "nodejs";
// Handler for GET /api/applications
export async function GET() {
  try {
    const apps = await readApplications();
    return NextResponse.json(apps);
  } catch (err: any) {
    console.error("GET /api/applications failed:", err?.message || err, err);
    return NextResponse.json(
      { error: err?.message || "KV error" },
      { status: 500 }
    );
  }
}
// Handler for POST /api/applications
export async function POST(req: Request) {
  const body = (await req.json()) as Partial<JobApplication>;

  const now = new Date().toISOString();

  const newApp: JobApplication = {
    id: crypto.randomUUID(),
    companyName: (body.companyName || "").trim(),
    roleTitle: (body.roleTitle || "").trim(),
    location: (body.location || "").trim(),
    status: (body.status as any) || "Wishlist",
    jobUrl: body.jobUrl?.trim() || undefined,
    notes: body.notes?.trim() || undefined,
    appliedDate: body.appliedDate || undefined,
    createdAt: now,
    updatedAt: now,
  };

  //do basic validation server-side for the required fields
  if (!newApp.companyName || !newApp.roleTitle) {
    return NextResponse.json(
      { error: "companyName and roleTitle are required" },
      { status: 400 }
    );
  }
  // get current applications, add the new one to top, and save in json file
  const current = await readApplications();
  const next = [newApp, ...current];

  await writeApplications(next);
  return NextResponse.json(newApp, { status: 201 });
}