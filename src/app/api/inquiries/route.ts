import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "db.json");

function readDb() {
  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(fileData);
  } catch {
    return { projects: [], blogs: [], inquiries: [] };
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

export async function POST(request: Request) {
  try {
    const inquiry = await request.json();
    const db = readDb();

    // Append unique ID, timestamp, and read flag
    const newInquiry = {
      id: Math.random().toString(36).substring(2, 9),
      ...inquiry,
      date: new Date().toISOString(),
      read: false,
    };

    db.inquiries = [newInquiry, ...(db.inquiries || [])];

    const success = writeDb(db);
    if (success) {
      return NextResponse.json({ success: true, inquiry: newInquiry });
    } else {
      return NextResponse.json({ error: "Failed to write inquiry" }, { status: 500 });
    }
  } catch (e: unknown) {
    const errMsg = e instanceof Error ? e.message : "Invalid request body";
    return NextResponse.json({ error: errMsg }, { status: 400 });
  }
}
