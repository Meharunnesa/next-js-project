import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">User Management</h1>

      <div className="space-x-4">
        <Link href="/form" className="underline text-blue-600 p-4 bg-gray-200 border border-[#f6f6f6]">
          Add User
        </Link>
        <Link href="/users" className="underline text-blue-600">
          View Users
        </Link>
      </div>
    </div>
  );
}
