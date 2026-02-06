'use client';

import { useState } from 'react';
import AddForm from './components/AddForm';
import UsersList from './components/UsersList';

export default function Home() {
  const [view, setView] = useState('list');

  return (
    <div className="max-w-[1280px] mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => setView('form')}
          className={`p-4 border ${
            view === 'form'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-blue-600'
          }`}
        >
          Add User
        </button>

        <button
          onClick={() => setView('list')}
          className={`p-4 border ${
            view === 'list'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-blue-600'
          }`}
        >
          View Users
        </button>
      </div>

      {/* Content */}
      {view === 'list' && (
        <>
          <h2 className="text-2xl font-bold">Users List</h2>
          <UsersList />
        </>
      )}

      {view === 'form' && (
        <>
          <h2 className="text-2xl font-bold">Add User</h2>
          <AddForm onSuccess={() => setView('list')} />
        </>
      )}
    </div>
  );
}
