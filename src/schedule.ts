import Meeting from "./Meeting"
import Time from "./Time"

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

    getStudents(day: string, start: Time, end: Time): Object[] {
        const lower_day = day.toLowerCase()
        const meetings:[Meeting] = this.meetings[lower_day]

        for (const meeting of meetings) {
            if (meeting.equalTo(new Meeting(start, end))) {
                return meeting.getStudents()
            }
        }
        return []
    }

}

export default Schedule