export interface Availability {
    day: string;
    startTime: string;
    endTime: string;
}

export interface StudentRecord {
    id: number;
    name: string;
    grade: string;
    topic: string;
    times: Availability[];
}
