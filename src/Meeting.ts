import Time from './Time'
import Student from './Student'

class Meeting {
    start: Time
    end: Time
    students: Object[] = []
    blocked: Boolean = false
    
    constructor(start:Time, end:Time) {
        this.start = start
        this.end = end
    }

    blockTime() : void {
        this.blocked = true
    }

    isBlocked(): Boolean {
        return this.blocked
    }

    addStudent(student: Student): void {
        this.students.push(student)
    }

    getStudents(): Object[] {
        return this.students
    }

    getStart(): Time {
        return this.start
    }

    getEnd(): Time {
        return this.end
    }

}

export default Meeting