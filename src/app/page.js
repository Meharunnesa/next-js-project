'use client';

import AddForm from './components/AddForm';
import UsersList from './components/UsersList';

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto py-10 space-y-10">
      <AddForm/>
      <UsersList/>
    </div>
  );
}
