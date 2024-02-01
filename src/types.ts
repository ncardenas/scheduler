export interface Availability {
    day: string;
    startTime: number;
    endTime: number;
}

export interface StudentRecord {
    id: number;
    firstName: string;
    lastName: string;
    grade: string;
    topic: string;
    times: Availability[];
}
