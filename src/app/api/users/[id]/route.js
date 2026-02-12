export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/users.json');

function readUsers() {
  const data = fs.readFileSync(filePath, 'utf8');
  return data ? JSON.parse(data) : [];
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const users = readUsers();

    console.log('PUT called with ID:', id);
    console.log('All User IDs:', users.map(u => u.id));

    const index = users.findIndex(u => String(u.id) === String(id)); 

    if (index === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    users[index] = {
      ...users[index],
      ...body,
    };

    writeUsers(users);

    return NextResponse.json(users[index], { status: 200 });
  } catch (error) {
    console.error('PUT ERROR:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    
    const users = readUsers();

    console.log('DELETE called with ID:', id);
    console.log('All User IDs:', users.map(u => u.id));

    const index = users.findIndex(u => String(u.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const deletedUser = users[index];
    users.splice(index, 1);

    writeUsers(users);

    return NextResponse.json({ 
      message: 'User deleted successfully',
      user: deletedUser 
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE ERROR:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}