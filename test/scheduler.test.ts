import { breakUpTimes, initializeIntervals, blockTimes, addToIntervals } from "../src/scheduler";
import Time from "../src/Time";
import Student from '../src/Student'
import Meeting from "../src/Meeting"
import exp = require("constants");

describe("scheduler", () => {
    it("breakUpTimes()",() => {
        const interval = 30
        const student_availability = [{'start': new Time(8,0), 'end': new Time(14,0)}] 
        const expected = [
            {'start': new Time(8), 'end': new Time(8,30)},
            {'start': new Time(8,30), 'end': new Time(9)},
            {'start': new Time(9), 'end': new Time(9,30)},
            {'start': new Time(9,30), 'end': new Time(10)},
            {'start': new Time(10), 'end': new Time(10,30)},
            {'start': new Time(10,30), 'end': new Time(11)},
            {'start': new Time(11), 'end': new Time(11,30)},
            {'start': new Time(11,30), 'end': new Time(12)},
            {'start': new Time(12), 'end': new Time(12,30)},
            {'start': new Time(12,30), 'end': new Time(13)},
            {'start': new Time(13), 'end': new Time(13,30)},
            {'start': new Time(13,30), 'end': new Time(14)}
        ]

        const actual = breakUpTimes(interval, student_availability)
        expect(actual).toEqual(expected)
    })

    it("initializeIntervals()", () => {
        const interval = 60
        const actual = initializeIntervals(interval, new Time(8), new Time(14))
        const expected = [
            new Meeting(new Time(8), new Time(9)),
            new Meeting(new Time(9), new Time(10)),
            new Meeting(new Time(10), new Time(11)),
            new Meeting(new Time(11), new Time(12)),
            new Meeting(new Time(12), new Time(13)),
            new Meeting(new Time(13), new Time(14))
        ]

        expect(actual).toEqual(expected)
    })

    it("blockTimes()", () => {
        const blockout_times = [
            {'start': new Time(10), 'end': new Time(11)},
            {'start': new Time(12), 'end': new Time(13)}
        ]
        const interval = 60
        const meeting_intervals = initializeIntervals(interval, new Time(8), new Time(14))
        
        blockTimes(blockout_times, meeting_intervals)
        const expected = [
            new Meeting(new Time(8), new Time(9)),
            new Meeting(new Time(9), new Time(10)),
            new Meeting(new Time(10), new Time(11)),
            new Meeting(new Time(11), new Time(12)),
            new Meeting(new Time(12), new Time(13)),
            new Meeting(new Time(13), new Time(14))
        ]
        expected[2].blockTime()
        expected[4].blockTime()

        expect(meeting_intervals).toEqual(expected)
    })

    it("addToInervals()", () => {
        const student = new Student(1,1)
        student.addAvailability('monday', new Time(8), new Time(14))

        const availability = {'start': new Time(10), 'end': new Time(11)}
        const meeting_intervals = initializeIntervals(60, new Time(8), new Time(14))
        addToIntervals(student, availability, meeting_intervals)

        const expected = [
            new Meeting(new Time(8), new Time(9)),
            new Meeting(new Time(9), new Time(10)),
            new Meeting(new Time(10), new Time(11)),
            new Meeting(new Time(11), new Time(12)),
            new Meeting(new Time(12), new Time(13)),
            new Meeting(new Time(13), new Time(14))
        ]

        expected[2].addStudent(student)

        expect(meeting_intervals).toEqual(expected)
    })
})