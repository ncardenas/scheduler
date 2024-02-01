export interface Availability {
    day: string;
    startTime: number;
    endTime: number;
}

export interface StudentRecord {
    id: number;
    name: string;
    grade: string;
    topic: string;
    times: Availability[];
}
