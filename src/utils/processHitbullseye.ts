// utils/processHitbullseye.ts
import * as XLSX from "xlsx";
import { HitbullseyeStudent } from "@/types/Student";
import { normalizeRoll, normalizeEmail } from "./helpers";

export async function processHitbullseyeFile(
    file: File,
    rollCallFile: File
): Promise<HitbullseyeStudent[]> {

    const [dataBuffer, rollBuffer] = await Promise.all([
        file.arrayBuffer(),
        rollCallFile.arrayBuffer(),
    ]);

    const dataWb = XLSX.read(dataBuffer, { type: "array" });
    const rollWb = XLSX.read(rollBuffer, { type: "array" });

    const sheet = dataWb.Sheets[dataWb.SheetNames[0]];
    const rollSheet = rollWb.Sheets[rollWb.SheetNames[0]];

    const rollRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(
        rollSheet,
        { defval: "" }
    );

    const jsonData = XLSX.utils.sheet_to_json<Record<string, string | number | null>>(
        sheet,
        { defval: "-", range: 1 }
    );

    if (jsonData.length === 0) return [];

    const allCols = Object.keys(jsonData[0]);

    const overallCols = allCols.filter(
        (col) => col.toLowerCase().includes("overall") && col.includes("50")
    );
    const weScoreCols = allCols.filter(
        (col) => col.toLowerCase().includes("we") && col.includes("100")
    );

    const totalTests = overallCols.length + weScoreCols.length;

    const studentMap = new Map<string, {
        name: string;
        division: string;
        email: string;
        testsAppeared: string;
        recentAptitudeMarks: string | number;
        recentCodingScore: string | number;
    }>();

    jsonData.forEach((row) => {
        const hitId = String(row["Hitbullseye ID"] ?? "").trim();
        if (!hitId || hitId === "-") return;

        let appeared = 0;
        [...overallCols, ...weScoreCols].forEach((col) => {
            const val = row[col];
            if (val !== "-" && val !== "" && val !== null && val !== undefined) {
                appeared++;
            }
        });

        const lastOverall = row[overallCols[overallCols.length - 1]];
        const lastWe = row[weScoreCols[weScoreCols.length - 1]];

        studentMap.set(hitId, {
            name: String(row["Name"] ?? row["Student Name"] ?? "-"),
            division: String(row["Division"] ?? row["Section"] ?? "-"),
            email: normalizeEmail(String(row["Email"] ?? "-")),
            testsAppeared: `${appeared} out of ${totalTests}`,
            recentAptitudeMarks:
                lastOverall === "-" || lastOverall == null ? "AB" : lastOverall,
            recentCodingScore:
                lastWe === "-" || lastWe == null ? "AB" : lastWe,
        });
    });

    const results: HitbullseyeStudent[] = [];

    for (const r of rollRows) {
        const hitId = String(r["Hitbullseye ID"] ?? "").trim();
        const rollNo = normalizeRoll(String(r["Roll No"] ?? ""));
        const data = studentMap.get(hitId);

        results.push({
            rollNo,
            name: data?.name ?? "-",
            division: rollNo && rollNo.length >= 3 ? rollNo[2].toUpperCase() : "-",
            email: data?.email ?? "-",
            testsAppeared: data?.testsAppeared ?? "-",
            recentAptitudeMarks: data?.recentAptitudeMarks ?? "AB",
            recentCodingScore: data?.recentCodingScore ?? "AB",
        });
    }
    
    const divisionOrder: Record<string, number> = { A: 0, B: 1, C: 2 };

    results.sort((a, b) => {
        const da = (a.division ?? "").trim().toUpperCase();
        const db = (b.division ?? "").trim().toUpperCase();
        const pa = divisionOrder[da] ?? 99;
        const pb = divisionOrder[db] ?? 99;
        if (pa !== pb) return pa - pb;
        return (a.rollNo ?? "").localeCompare(b.rollNo ?? "");
    });

    return results;
}