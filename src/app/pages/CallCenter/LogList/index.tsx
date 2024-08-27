import { useState } from "react";
import { CallCenterDashboardProps } from "../Dashboard/types";
import { FaSort } from "react-icons/fa";

// Dummy log data
const logsData = [
  {
    id: 1,
    date: "2024-05-23",
    time: "10:15 AM",
    user: "Tewodros Abebe",
    action: "Created new group",
    details: "Group A",
  },
  {
    id: 2,
    date: "2024-05-22",
    time: "09:45 AM",
    user: "Tewodros Abebe",
    action: "Register New Member",
    details: "John Doe",
  },
  {
    id: 3,
    date: "2024-05-21",
    time: "02:30 PM",
    user: "Tewodros Abebe",
    action: "Register Collective House",
    details: "Bole",
  },
  // Add more dummy logs as needed
];

function Logs({ minimized }: CallCenterDashboardProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedLogs = [...logsData].sort((a, b) => {
    if (sortField) {
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];
      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  return (
    <div
      className={`w-full ${
        minimized ? "lg:w-[90%]" : "lg:w-[80%]"
      } items-center h-screen mt-16 right-0 fixed transition-all duration-500 ease-in overflow-scroll p-4`}
    >
      <h1 className="text-2xl font-bold mb-4">Admin Logs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr>
              {["Date", "Time", "User", "Action", "Details"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 border-b text-left cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    <div className="flex items-center">
                      {header}
                      {sortField === header.toLowerCase() && (
                        <FaSort
                          className={`ml-2 ${
                            sortOrder === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-2 border-b">{log.date}</td>
                <td className="px-4 py-2 border-b">{log.time}</td>
                <td className="px-4 py-2 border-b">{log.user}</td>
                <td className="px-4 py-2 border-b">{log.action}</td>
                <td className="px-4 py-2 border-b">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Logs;
