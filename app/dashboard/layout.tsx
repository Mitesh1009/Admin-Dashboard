import Sidebar from ".././_components/sidebar/sidebar";
import Header from ".././_components/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard project",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  );
}
