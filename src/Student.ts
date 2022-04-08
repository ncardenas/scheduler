import Time from './Time'

class Student {
    id: number
    name: string
    grade: number
    disability: string
    availability: Object

    constructor(id: number=0, name: string='', grade: number=0, disability: string='', availability: Object={}) {
        this.id = id
        this.name = name
        this.grade = grade
        this.disability = disability
        this.availability = availability
        // this.availability = {
        //     'monday': [],
        //     'tuesday': [],
        //     'wednesday': [],
        //     'thursday': [],
        //     'friday': []
        // }
    }
    
    addAvailability(day: string, start: Time, end: Time) : void {
        this.availability[day.toLowerCase()].push( {'start': start, 'end': end} )
    }

    getAvailability(day: string) : Object[] {
        return this.availability[day.toLowerCase()]
    }

    getId() : number { return this.id }
    getName() : string { return this.name }
    getGrade() : number { return this.grade }
    getDisability(): string { return this.disability }
}

export default Student