'use client';

import { useState } from 'react';
import EditUserForm from './EditUserForm';
import { useQuery } from '@tanstack/react-query';

export default function UsersList() {

  const [editingUser, setEditingUser] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });

  if (isLoading) {
    return <p className="text-center py-6">Loading users...</p>;
  }

  return (
    <div className="max-w-[1280px] mx-auto py-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border-b">#</th>
            <th className="p-3 text-left border-b">Username</th>
            <th className="p-3 text-left border-b">Email</th>
            <th className="p-3 text-left border-b">Created At</th>
            <th className="p-3 text-left border-b">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="p-6 text-center text-gray-500"
              >
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="p-3 border-b">{index + 1}</td>
                <td className="p-3 border-b">{user.username}</td>
                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="p-3 border-b space-x-2">
                  {/* <button className="text-blue-600 hover:underline">
                    Edit
                  </button> */}
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <EditUserForm
              user={editingUser}
              onClose={() => setEditingUser(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
