"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Component Types
interface SectionHeaderProps {
  children: React.ReactNode;
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

// Reusable Components
const SectionHeader = ({ children }: SectionHeaderProps) => (
  <h2 className="text-3xl font-bold mb-10 text-center">{children}</h2>
);

const Accordion = ({ title, children }: AccordionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 flex justify-between items-center font-medium text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      >
        {title}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {open && <div className="px-6 py-4">{children}</div>}
    </div>
  );
};

export default function Page() {
  const router = useRouter();

  const departments: { label: string; color: string; path: string }[] = [
    { label: "COMP", color: "text-blue-600", path: "/comp" },
    { label: "IT", color: "text-green-600", path: "/it" },
    { label: "ENTC", color: "text-purple-600", path: "/entc" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 dark:text-white transition">
      <div className="w-full max-w-6xl">

        {/* ====================== Department Selection ====================== */}
        <h1 className="text-3xl font-bold text-center mb-10">Select Department</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {departments.map(({ label, color, path }) => (
            <div
              key={label}
              onClick={() => router.push(path)}
              className="cursor-pointer p-8 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 transition"
            >
              <h3 className={`text-2xl font-bold text-center ${color}`}>
                {label}
              </h3>
            </div>
          ))}
        </div>

        {/* ====================== Guidelines Section ====================== */}
        <SectionHeader>Guidelines</SectionHeader>

        <div className="space-y-6">

          {/* GFG Attendance */}
          <Accordion title="1. GFG Attendance Sheet Requirements">
            <div className="flex justify-center mb-4">
              <Image
                src="/formats/gfg_sheet1_attendance.png"
                alt="GFG Sheet 1 Attendance Format"
                width={900}
                height={600}
                className="rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition"
              />
            </div>

            <p className="font-medium">Required Columns:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Name</li>
              <li>Email</li>
              <li>Lecture 1, Lecture 2, ... Lecture N</li>
            </ul>
          </Accordion>

          {/* GFG Assessment */}
          <Accordion title="2. GFG Assessment Sheet Requirements">
            <div className="flex justify-center mb-4">
              <Image
                src="/formats/gfg_sheet2_assessment.png"
                alt="GFG Sheet 2 Assessment Format"
                width={900}
                height={600}
                className="rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition"
              />
            </div>

            <p className="font-medium">Required Structure & Columns:</p>

            <ul className="list-disc ml-6 space-y-2">
              <li>Row 1: User Details (Name, Email, Phone) separated by blank columns</li>
              <li>Weekly Assessment 1, Weekly Assessment 2, ... Weekly Assessment N</li>

              <li>
                Row 2 must include:
                <ul className="list-disc ml-8 space-y-1">
                  <li>Name</li>
                  <li>Email</li>
                  <li>Phone Number</li>
                  <li>Coding Problem Score (mandatory)</li>
                  <li>Quiz Score</li>
                  <li>Time Taken (optional)</li>
                </ul>
              </li>

              <li>Student data starts from row 3</li>
            </ul>
          </Accordion>

          {/* GFG Roll Call */}
          <Accordion title="3. GFG Roll Call File Requirements">
            <div className="flex justify-center mb-4">
              <Image
                src="/formats/gfg_rollcall.png"
                alt="GFG Roll Call Format"
                width={900}
                height={600}
                className="rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition"
              />
            </div>

            <p className="font-medium">Required Columns:</p>

            <ul className="list-disc ml-6 space-y-1">
              <li>Name</li>
              <li>Branch</li>
              <li>Roll No</li>
              <li>Division</li>
              <li>Contact No</li>
              <li>Email ID (registered or &quot;not registered&quot;)</li>
            </ul>
          </Accordion>

          {/* Hitbullseye Format */}
          <Accordion title="4. Hitbullseye File Format Requirements">
            <div className="flex justify-center mb-4">
              <Image
                src="/formats/hitbullseye_format.png"
                alt="Hitbullseye File Format"
                width={900}
                height={600}
                className="rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition"
              />
            </div>

            <p className="font-medium">Required Columns:</p>

            <ul className="list-disc ml-6 space-y-1">
              <li>Roll No</li>
              <li>Name</li>
              <li>Section</li>
              <li>Email</li>
              <li>Overall - Marks (50) × N</li>
              <li>We Score (100) × N</li>
              <li>Data starts from row 5</li>
            </ul>
          </Accordion>

        </div>
      </div>
    </main>
  );
}
