import { breakUpTimes } from "../src/scheduler";
import Time from "../src/Time";

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

})