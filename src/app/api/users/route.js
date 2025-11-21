import { NextResponse } from 'next/server';

// TEMP DATA STORAGE (replace with DB later)
let USERS = [];

export async function GET() {
  return NextResponse.json(USERS);
}

export async function POST(request) {
  const body = await request.json();
  const newUser = {
    id: Date.now().toString(),
    username: body.username,
    email: body.email,
    createdAt: new Date().toISOString(),
  };
  USERS.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}

