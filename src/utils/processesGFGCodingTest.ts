import * as XLSX from "xlsx";
import { normalizeEmail, advanceNormalizeRoll, normalizeBranch, getDivision } from "./helpers";
import { readWorkbookFromFile } from "./parseExcel";
import { TestResult } from "@/types/Student";

export async function processGFGCodingTestFiles(testFile: File) {
    const testWb = await readWorkbookFromFile(testFile);
    const testSheet = testWb.Sheets[testWb.SheetNames[0]];
    const testRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(testSheet, { defval: "" });

    const results: TestResult[] = [];

    for (const row of testRows) {
        const name = (row["Name"] ?? row["name"] ?? "") as string;
        const rollNoRaw = (row["Roll No"] ?? row["Roll"] ?? row["RollNo"] ?? row["PRN"] ?? row["Roll No."] ??"") as string;
        const rollNo = advanceNormalizeRoll(rollNoRaw);
        const emailRaw = (row["Email ID"] ?? row["Email"] ?? row["email"] ?? row["Email ID:  Kindly enter the Email ID which is registered for GFG "] ?? "") as string;
        const email = normalizeEmail(emailRaw);
        const branchRaw = (row["Branch"] ?? row["branch"] ?? "") as string;
        const branch = normalizeBranch(branchRaw);
        const score = (row["Score"] ?? row["score"] ?? row["Contest score(Out of 100 Marks)"]?? 0) as number;
        const division = getDivision(rollNo);

        results.push({
            name,
            rollNo,
            email,
            branch,
            score,
            division,
        });
    }

    const branchOrder = {
    "COMPUTER ENGINEERING": 0,
    "INFORMATION TECHNOLOGY": 1,
    "ELECTRONICS AND TELECOMMUNICATION": 2
    };

    const divisionOrder = { A: 0, B: 1, C: 2 };
    results.sort((a, b) => {
        const ba = (a.branch || "").toUpperCase().trim();
        const bb = (b.branch || "").toUpperCase().trim();

        const pa = branchOrder[ba as keyof typeof branchOrder] ?? 99;
        const pb = branchOrder[bb as keyof typeof branchOrder] ?? 99;

        if (pa !== pb) return pa - pb;

        const da = (a.division || "").toUpperCase().trim();
        const db = (b.division || "").toUpperCase().trim();

        const pda = divisionOrder[da as keyof typeof divisionOrder] ?? 99;
        const pdb = divisionOrder[db as keyof typeof divisionOrder] ?? 99;

        if (pda !== pdb) return pda - pdb;

        return (a.rollNo || "").localeCompare(b.rollNo || "");
    });
    
    return results;
}