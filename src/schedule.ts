class Schedule {
    meetings: Object

    constructor() {
        this.meetings = {
            'monday': [],
            'tuesday': [],
            'wednesday': [],
            'thursday': [],
            'friday': []
        }
    }

    addMeetings(day: string, meetings: Object[]): void {
        this.meetings[day.toLowerCase()].push(meetings)
    }

    getMeetings(day: string): Object[] {
        return this.meetings[day.toLowerCase()]
    }
}

export default Schedule