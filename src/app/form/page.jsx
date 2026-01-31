
'use client';

import AddForm from '../components/AddForm';

export default function FormPage() {
  return (
    <div className="max-w-[1280px] mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add User</h1>
      <AddForm />
    </div>
  );
}
