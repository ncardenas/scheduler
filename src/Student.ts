import Time from './Time'

class Student {
    id: number
    grade: number
    availability: Object

    constructor(student_id: number=0, grade: number=0) {
        this.id = student_id
        this.grade = grade
        this.availability = {
            'monday': [],
            'tuesday': [],
            'wednesday': [],
            'thursday': [],
            'friday': []
        }
    }
    
    addAvailability(day: string, start: Time, end: Time) {
        this.availability[day.toLowerCase()].push( {'start': start, 'end': end} )
    }

    getAvailability(day: string) : Object[] {
        return this.availability[day.toLowerCase()]
    }
}

export default Student