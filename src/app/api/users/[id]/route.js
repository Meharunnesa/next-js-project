export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/users.json');

function readUsers() {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const data = fs.readFileSync(filePath, 'utf8');
  return data ? JSON.parse(data) : [];
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const body = await req.json();

    const users = readUsers();

    const index = users.findIndex(
      (u) => u.id === id
    );

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

    return NextResponse.json(users[index], { status: 200 });

  } catch (error) {
    console.error('PUT CRASH:', error);

    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
