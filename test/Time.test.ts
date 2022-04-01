import Time from "../src/Time"
// node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand test/Time.test.ts
describe("test student", () =>{
    const hour = 11
    const minutes = 30
    const time = new Time(hour, minutes)

    it("test getHour()", () => {
        expect(time.getHour()).toBe(hour)
    })

    it("test getMinute()", () => {
        expect(time.getMinute()).toBe(minutes)
    })

    const time_in_mins = 690
    it("test getTimeInMins()", () => {
        expect(time.getTimeInMins()).toBe(time_in_mins)
    })

    const equal_time = new Time(11, 30)
    it("test areEqual()", () => {
        expect(time.areEqual(equal_time)).toBe(true)
    })

    const not_equal_time = new Time(11, 31)
    it("test areEqual()", () => {
        expect(time.areEqual(not_equal_time)).toBe(false)
    })

})