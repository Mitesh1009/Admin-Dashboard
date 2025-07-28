import { navItems } from "../../_constants/sidebar";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 hidden md:flex flex-col bg-gray-800 p-4 space-y-4">
      {navItems.map(({ name, icon: Icon, href }) => (
        <Link
          key={name}
          href={href}
          className="flex items-center p-2 hover:bg-gray-700 rounded-md transition"
        >
          <Icon className="w-6 h-6 mr-3 text-white" />
          {name}
        </Link>
      ))}
    </aside>
  );
}
