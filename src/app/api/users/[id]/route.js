// src/app/api/users/[id]/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/users.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const users = readUsers();

  const index = users.findIndex(u => u.id === id); // Use strict equality
  if (index === -1) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  users[index] = {
    ...users[index],
    ...body,
  };

  writeUsers(users);

  return NextResponse.json(users[index]);
}