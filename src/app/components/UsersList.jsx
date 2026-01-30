'use client';

import { useQuery } from '@tanstack/react-query';

export default function UsersList() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      return res.json();
    },
  });

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="max-w-[1280px] py-10 mx-auto">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 border rounded">
            <p>
              <strong>Name:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
