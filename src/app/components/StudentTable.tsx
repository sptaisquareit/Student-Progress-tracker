// src/app/components/StudentTable.tsx
import React from "react";

interface Student {
  name: string;
  rollNo: string;
  division: string;
  email: string;
  sessionsAttended?: string;
  testsAppeared?: string;
  avgCoding?: number;
}

interface Props {
  data: Student[];
}

const StudentTable: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase font-semibold">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Roll No</th>
            <th className="px-4 py-2">Division</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Sessions Attended</th>
            <th className="px-4 py-2">Tests Appeared</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, i) => (
            <tr
              key={i}
              className={`border-t dark:border-gray-700 ${
                i % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{s.name}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{s.rollNo}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{s.division}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{s.email}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{s.sessionsAttended}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{s.testsAppeared}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
