export interface Availability {
    day: string;
    startTime: number;
    endTime: number;
}

export type FormData = {
    id: number;
    firstName: string;
    lastName: string;
    grade: string;
    topic: string;
    times: Availability[];
};
