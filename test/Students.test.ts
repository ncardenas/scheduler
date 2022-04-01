import Student from "../src/Student"
import Time from "../src/Time"

describe("test student", () =>{
    const start_time = new Time(10,0)
    const end_time = new Time(11)
    const student = new Student(0, 0)

    student.addAvailability('monday', start_time, end_time)
    const availabilities = student.getAvailability('monday')
    const availability = availabilities[0]
    
    it("should return 0 for ", () => {
        expect(availability['start'].getHour()).toBe(10)
    })
})
