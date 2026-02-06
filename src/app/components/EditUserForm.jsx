'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function EditUserForm({ user, onClose }) {
  const queryClient = useQueryClient();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (updatedUser) => {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error('Failed to update user');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ username, email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isLoading ? 'Saving...' : 'Update'}
        </button>
      </div>
    </form>
  );
}
