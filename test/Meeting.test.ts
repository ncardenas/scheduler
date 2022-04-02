import Meeting from '../src/Meeting'
import Time from '../src/Time'
import Student from '../src/Student'

describe("Meeting", () => {
    const start = new Time(10, 30)
    const end = new Time(11, 0)

    const meeting = new Meeting(start, end)

    it("isBlocked()", () => {
        expect(meeting.isBlocked()).toBe(false)
    })

    it("blockTime()", () => {
        meeting.blockTime()
        expect(meeting.isBlocked()).toBe(true)
    })

    it("addStudent()/getStudent()", () => {
        const student = new Student(0,0)
        meeting.addStudent(student)

        expect(meeting.getStudents().length).toBe(1)
    })

    it("getStart()", () => {
        expect(meeting.getStart().equalTo(start)).toBe(true)
    })

    it("getEnd()", () => {
        expect(meeting.getEnd().equalTo(end)).toBe(true)
    })
})