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

    setMeetings(day: string, meetings: Object[]): void {
        this.meetings[day.toLowerCase()] = meetings
    }

    getMeetings(): Object
    getMeetings(day: string): Object[]
    getMeetings(day?: string): any {
        if (day) {
            return this.meetings[day.toLowerCase()]
        }
        return this.meetings
    }
}

export default Schedule