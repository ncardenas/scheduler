import Time from "./Time"
import Meeting from "./Meeting"
import Student from "./Student"
import Schedule from "./Schedule"

export function breakUpTimes(interval: number, times: Object[]): Object[] {
    if (times.length === 0) return []

    const result = []
    for (const time of times) {
        var i = 1
        var new_end = time['start']
        while (true) {
            var new_start = new_end
            new_end = new_start.addMinutes(interval)
            var new_interval = {'start': new_start, 'end': new_end}
            result.push(new_interval)
            i += 1

            if (new_end.greaterThanOrEqualTo(time['end'])) {
                break
            }
        }
    }
    return result
}

export function initializeIntervals(interval: number, start: Time=new Time(), stop:Time=new Time(24, 0)) {
    var result = []
    while (start.lessThan(stop)) {
        var end = start.addMinutes(interval)
        result.push(new Meeting(start, end))
        start = end
    }
    return result
}

export function blockTimes(blockout_times: Object[], meeting_intervals: Meeting[]) {
    for (const time of blockout_times) {
        for (const meeting of meeting_intervals) {
            if (time['start'].equalTo(meeting.getStart()) && time['end'].equalTo(meeting.getEnd())) {
                meeting.blockTime()
                break
            }
        }
    }
}

export function addToIntervals(student: Student, add_me: Object, meeting_intervals: Meeting[]) {
    for (const time_slot of meeting_intervals) {
        if (time_slot.isBlocked()) {
            continue
        }

        if (time_slot.getStart().equalTo(add_me['start']) && time_slot.getEnd().equalTo(add_me['end'])) {
            time_slot.addStudent(student)
            break
        }
    }
}

export function getMeetings(interval: number, blockout_times: Object, students: Student[], day: string) {
    var meeting_intervals = initializeIntervals(interval)

    if (blockout_times[day]) {
        const updated_blockout_times = breakUpTimes(interval, blockout_times[day])
        blockTimes(updated_blockout_times, meeting_intervals)
    }

    for (const student of students) {
        let times = student.getAvailability(day)
        if (!times) continue
        let student_availability = breakUpTimes(interval, times) 
        for (const a of student_availability) {
            addToIntervals(student ,a, meeting_intervals)
        }
    }
    return meeting_intervals
}

export function doSchedule(interval: number, blockout_times: Object, students: Student[]) {
    var schedule = new Schedule()

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    for (const day of days) {
        const meetings = getMeetings(interval, blockout_times, students, day)
        schedule.setMeetings(day, meetings)
    }
    return schedule
}