import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  const user = { email: "user@example.com", password: "password123", name: "Arslan" };
  if (email === user.email && password === user.password) {
    return NextResponse.json(
      { token: "fake-jwt-token", user: { email, name: user.name } },
      { status: 200 }
    );
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
