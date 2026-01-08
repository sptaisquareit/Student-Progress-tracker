"use client";
import React from "react";
import { HitbullseyeStudent } from "@/types/Student";

interface Props {
  students: HitbullseyeStudent[];
}

const HitbullseyeTable: React.FC<Props> = ({ students }) => {
  if (!students || students.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300 py-10">
        No Hitbullseye data found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <table className="min-w-full bg-white dark:bg-gray-900 text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
          <tr>
            <th className="px-4 py-3">Sr. No</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Roll No</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Division</th>
            <th className="px-4 py-3">Tests Appeared</th>
            <th className="px-4 py-3">Recent Aptitude Marks</th>
            <th className="px-4 py-3">Recent Coding Score</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr
              key={i}
              className={`border-t dark:border-gray-700 ${
                i % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                {i + 1}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                {s.name}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                {s.rollNo}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                {s.email}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                {s.division}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                {s.testsAppeared}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                {s.recentAptitudeMarks}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                {s.recentCodingScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HitbullseyeTable;
