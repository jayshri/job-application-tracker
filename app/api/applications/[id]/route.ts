// Handler for GET, PUT, DELETE /api/applications/[id]
import { NextResponse } from "next/server";
import {
  readApplications,
  writeApplications,
} from "../../../../lib/server/applicationsStore";
import { JobApplication } from "../../../../lib/types";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };
// Handler for GET /api/applications/[id]
export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  // find the application by ID and return it in json response
  const all = await readApplications();
  const found = all.find((a) => a.id === id) || null;

  if (!found) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(found);
}
// Handler for PUT /api/applications/[id]
export async function PUT(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = (await req.json()) as Partial<JobApplication>;
  // find the existing application and update its fields
  const all = await readApplications();
  const current = all.find((a) => a.id === id);

  if (!current) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const now = new Date().toISOString();

  const updated: JobApplication = {
    ...current,
    companyName: (body.companyName ?? current.companyName).trim(),
    roleTitle: (body.roleTitle ?? current.roleTitle).trim(),
    location: (body.location ?? current.location).trim(),
    status: (body.status as any) ?? current.status,
    jobUrl: body.jobUrl ? body.jobUrl.trim() : undefined,
    notes: body.notes ? body.notes.trim() : undefined,
    appliedDate: body.appliedDate ?? current.appliedDate,
    updatedAt: now,
  };

  if (!updated.companyName || !updated.roleTitle) {
    return NextResponse.json(
      { error: "companyName and roleTitle are required" },
      { status: 400 }
    );
  }
  // save the updated application list back to storage and return updated application in json response
  const next = all.map((a) => (a.id === id ? updated : a));
  await writeApplications(next);

  return NextResponse.json(updated);
}
// Handler for DELETE /api/applications/[id]
export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;

  const all = await readApplications();
  const exists = all.some((a) => a.id === id);

  if (!exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  // remove the application from storage and return success json response 
  const next = all.filter((a) => a.id !== id);
  await writeApplications(next);

  return NextResponse.json({ ok: true });
}