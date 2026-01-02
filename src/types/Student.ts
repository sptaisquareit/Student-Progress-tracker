
// src/types/Student.ts
export interface Student {
    name: string;
    rollNo: string;
    division: string;
    email: string;
    sessionsAttended: string;
    testsAppeared: string;
}

export interface HitbullseyeStudent {
    name: string;
    rollNo: string;
    email: string;
    division?: string;
    testsAppeared?: string;
    recentAptitudeMarks?: string | number;
    recentCodingScore?: string | number;
}
