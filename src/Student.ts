import Time from './Time'

class Student {
    id: number
    grade: number
    monday: Object[] = []
    tuesday: Object[] = []
    wednesday: Object[] = []
    thursday: Object[] = []
    friday: Object[] = []
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
        //if (day === 'monday') { this.monday.push(availability) }
        //else if (day === 'tuesday') { this.tuesday.push(availability) }
        //else if (day === 'wedesnday') { this.tuesday.push(availability) }
        //else if (day === 'thursday') { this.tuesday.push(availability) }
        //else if (day === 'friday') { this.tuesday.push(availability) }
        //else {}
    }

    getAvailability(day: string) : Object[] {
        return this.availability[day.toLowerCase()]
        //if (day === 'monday') { return this.monday }
        //else if (day === 'tuesday') { return this.tuesday }
        //else if (day === 'wednesday') { return this.wednesday }
        //else if (day === 'thursday') { return this.thursday }
        //else if (day === 'friday') { return this.friday }
        //else {}
    }
}

export default Student