import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const targetUser = process.env.ADMIN_USERNAME || "admin";
    const targetPass = process.env.ADMIN_PASSWORD || "admin123";

    if (username === targetUser && password === targetPass) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password configuration." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
