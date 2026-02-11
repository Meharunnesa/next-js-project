export const runtime = 'nodejs';

import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/users.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export async function GET() {
  return NextResponse.json(readUsers());
}

export async function POST(request) {
  const body = await request.json();
  const users = readUsers();

  const newUser = {
    id: Date.now().toString(),
    username: body.username,
    email: body.email,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return NextResponse.json(newUser, { status: 201 });
}
