import { stats } from "../../_constants/cards";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-2 sm:px-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl flex items-center space-x-4 shadow-md hover:shadow-lg transition"
        >
          <Icon className="text-blue-400" fontSize="large" />
          <div>
            <div className="text-gray-400 text-sm sm:text-base">{label}</div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
