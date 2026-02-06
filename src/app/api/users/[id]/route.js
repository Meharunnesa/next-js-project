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

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  users[userIndex] = {
    ...users[userIndex],
    username: body.username,
    email: body.email,
  };

  writeUsers(users);

  return NextResponse.json(users[userIndex]);
}
