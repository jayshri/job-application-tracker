import { NextResponse } from "next/server";
import { readApplications, writeApplications } from "../../../lib/server/applicationsStore";
import { JobApplication } from "../../../lib/types";

export const runtime = "nodejs";

export async function GET() {
  const apps = await readApplications();
  // return applications as json response
  return NextResponse.json(apps);
}

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