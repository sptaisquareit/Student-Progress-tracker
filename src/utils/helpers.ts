// utils/helpers.ts
export const normalizeEmail = (s?: string) =>
    (s || "").toString().trim().toLowerCase();

export const normalizeRoll = (s?: string) =>
    (s || "").toString().trim().toUpperCase();

export function isAttendancePresent(cell: string | number | null | undefined): boolean {
    if (cell === undefined || cell === null) return false;
    const v = String(cell).trim();
    if (v === "" || v === "-" || v.toLowerCase() === "not attended" || v === "#N/A") return false;
    // treat any numeric or time-like or text as present (per spec)
    if (/^\d+(:\d+){1,2}\s*(AM|PM|am|pm)?$/.test(v)) return true; // time
    if (/^\d+(\.\d+)?$/.test(v)) return true; // numeric
    // anything else non-empty -> treat as present (conservative)
    return true;
}

export function isTestPresent(cell: string | number | null | undefined): boolean {
    if (cell === undefined || cell === null) return false;
    const v = String(cell).trim();
    if (v === "" || v === "-") return false;
    // 0 is considered present
    return true;
}

export function advanceNormalizeRoll(s: any) {
  const trimmed = String(s ?? "").trim();
  const cleaned = trimmed.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (/^[A-Z]{3}\d+/.test(cleaned)) {
    return cleaned.substring(0,5);
  }

  return cleaned;
}

export function getDivision (rollNo: string) {
  if (rollNo.length < 3) return "";

  const division = rollNo[2];

  if (division === "A" || division === "B" || division === "C") {
    return division;
  }
  
  return "";
}

export function normalizeBranch(s: string) {
  const trimmed = String(s ?? "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z ]/g, "");

  // ENTC first
  if (
    trimmed.includes("ENTC") ||
    trimmed.includes("ETC") ||
    trimmed.includes("ELECTRONICS") ||
    trimmed.includes("ELEC")

  ) {
    return "ELECTRONICS AND TELECOMMUNICATION";
  }

  // IT second
  if (
    trimmed.includes("INFORMATION") ||
    trimmed.includes("INFO") ||
    trimmed.includes("IT") ||
    trimmed === "IT" ||
    trimmed.startsWith("IT ")
  ) {
    return "INFORMATION TECHNOLOGY";
  }

  // COMPUTER last
  if (
    trimmed.includes("COMPUTER") ||
    trimmed.includes("COMP") ||
    trimmed === "CS" ||
    trimmed === "CE"
  ) {
    return "COMPUTER ENGINEERING";
  }

  return trimmed;
}