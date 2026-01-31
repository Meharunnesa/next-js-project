
'use client';

import UsersList from '../components/UsersList';

export default function UsersPage() {
  return (
    <div className="max-w-[1280px] mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      <UsersList />
    </div>
  );
}
