import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/users.json');

function readUsers() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export async function GET() {
  const users = readUsers();
  return NextResponse.json(users);
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
