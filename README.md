# <b>Student Progress Tracker (GFG & Hitbullseye)</b>

**Live Application**: https://student-progress-tracker-teal.vercel.app/

An internal faculty-facing automation tool that processes student attendance and test performance data from **GeeksforGeeks** and **Hitbullseye**, aggregates key metrics, and generates downloadable Excel reports — eliminating manual calculations and repetitive administrative work.

![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black)
![Status](https://img.shields.io/badge/status-In%20Use-brightgreen)
![Deployment](https://img.shields.io/badge/Deployed-Vercel-blue)

## <b>Project Motivation & Problem Statement</b>

Faculty members often need to manually track:

- Lecture attendance
- Test participation
- Average scores
- Overall student engagement

When this data comes from **multiple external platforms** (GeeksforGeeks, Hitbullseye) and **multiple files**, the process becomes time-consuming, error-prone, and repetitive.

This project was built to **automate faculty workload** by:

- Parsing raw attendance and test files
- Merging student data across sources
- Computing meaningful metrics automatically
- Exporting clean, ready-to-use Excel reports

The goal is not to build another dashboard, but a **practical academic utility** that saves time and improves accuracy.

## <b>Project Goals</b>

- Automate attendance and test performance calculations
- Remove repetitive manual Excel work for faculty
- Ensure consistent and reliable report generation
- Support multi-department academic workflows
- Provide a simple, deployable tool without backend complexity

## <b>Why This Project Matters</b>

This project focuses on **real academic operations**, not demo data.

It is:

- Used by faculty members
- Applied across multiple departments
- Designed around real file formats and constraints
- Built to be simple, fast, and dependable

Rather than adding unnecessary databases or services, the system is intentionally **stateless** and **file-driven**, matching the actual workflow of educators.

## <b>Who Uses This System?</b>

### Faculty (Primary Users)

- Upload raw attendance and test files
- Generate consolidated student reports
- Download computed Excel sheets for records and evaluation

> There is no student-facing UI. The system is purpose-built for faculty efficiency.

## <b>Key Features</b>

- Upload-based processing of academic data files
- Aggregates attendance and test participation automatically
- Calculates:
  - Total lectures attended
  - Total tests attended
  - Average performance metrics

- Excel report generation for offline use
- Intelligent caching of static roll-call data to avoid repeated uploads
- Handles multiple platforms (GFG & Hitbullseye)

## <b>Data Processing Workflows</b>

### GeeksforGeeks Attendance

Input files:

- Java attendance file
- C++ attendance file
- Roll-call list (cached)

Output:

- Consolidated attendance report
- Total lecture count per student
- Attendance summary in Excel format

### Hitbullseye Test Analysis

Input file:

- Hitbullseye test report

Output:

- Test attendance status
- Marks of recent tests
- Excel summary for faculty review

## <b>System Constraints & Assumptions</b>

- Column names in uploaded files must remain consistent
- Attendance notation (especially for absentees) must follow defined formats
- Roll-call file structure must not change
- The system validates structure but assumes institution-standard formatting

These constraints ensure accuracy and predictable results.

## <b>Tech Stack</b>

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Frontend   | Next.js (App Router)                    |
| Processing | JavaScript (File parsing & aggregation) |
| Storage    | None (stateless, in-memory processing)  |
| Caching    | In-memory roll-call caching             |
| Deployment | Vercel                                  |

> No database or backend service is used, as the project focuses on deterministic file-based computation.

## <b>Deployment & Usage</b>

- **Status**: Live and actively used
- **Deployment**: Vercel
- **Users**: Faculty members from 3 departments:
  - Computer Engineering
  - Information Technology
  - Electronics & Telecommunication

This project is currently used as an **internal academic tool**.

## <b>Project Status</b>

**In Use**

- Stable and operational
- Actively used by faculty
- Improvements made based on real usage feedback

## <b>Getting Started</b>

```bash
npm install
npm run dev
```

Access the application locally at:

```
http://localhost:3000
```

## <b>Future Enhancements (Optional)</b>

- Configurable column mapping for flexible file formats
- Validation previews before report generation
- Multi-semester report comparison
- Download history for faculty reference

## <b>Note</b>

This repository may be accessed from multiple project references due to a resume hyperlink issue.
This project is independently built and maintained as a faculty automation tool.

## <b>Acknowledgements</b>

Built to reduce manual academic overhead and demonstrate practical problem-solving using real institutional data workflows.
