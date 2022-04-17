import Time from './Time'

class Student {
    id: number
    name: string
    grade: number
    topic: string
    availability: Object

    constructor(id: number=-1, name: string='empty', grade: number=-1, topic: string='empty', availability: Object={}) {
        this.id = id
        this.name = name
        this.grade = grade
        this.topic = topic
        this.availability = availability
    }

    addAvailability(day: string, start: Time, end: Time) : void {
        const lower_day = day.toLowerCase()
        if (lower_day in this.availability) {
            this.availability[lower_day].push( {'start': start, 'end': end} )
        }
        else {
            this.availability[lower_day] = {'start': start, 'end': end} 
        }
    }

    getAvailability(day: string) : Object[] {
        return this.availability[day.toLowerCase()]
    }

    getId() : number { return this.id }
    getName() : string { return this.name }
    getGrade() : number { return this.grade }
    getTopic(): string { return this.topic }

    // toJson() : Object {
    //     return {
    //         'id': this.id,
    //         'name': this.name,
    //         'grade': this.grade,
    //         'topic': this.topic,

    //     }
    // }
}

export default Student