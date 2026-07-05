import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "db.json");

function readDb() {
  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(fileData);
  } catch {
    return { projects: [], blogs: [], inquiries: [], services: [] };
  }
}

function writeDb(data: unknown) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const db = readDb();
  return NextResponse.json(db);
}

export async function POST(request: Request) {
  try {
    const { action, data } = await request.json();
    const db = readDb();

    if (action === "saveProjects") {
      db.projects = data;
    } else if (action === "saveBlogs") {
      db.blogs = data;
    } else if (action === "saveServices") {
      db.services = data;
    } else if (action === "saveInquiries") {
      db.inquiries = data;
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const success = writeDb(db);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to write to database" }, { status: 500 });
    }
  } catch (e: unknown) {
    const errMsg = e instanceof Error ? e.message : "Invalid request body";
    return NextResponse.json({ error: errMsg }, { status: 400 });
  }
}
