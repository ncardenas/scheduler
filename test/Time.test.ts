import Time from "../src/Time"
// node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand test/Time.test.ts
describe("Time", () =>{
    const hour = 11
    const minutes = 30
    const time = new Time(hour, minutes)

    it("getHour()", () => {
        expect(time.getHour()).toBe(hour)
    })

    it("getMinute()", () => {
        expect(time.getMinute()).toBe(minutes)
    })

    const time_in_mins = 690
    it("getTimeInMins()", () => {
        expect(time.getTimeInMins()).toBe(time_in_mins)
    })

    const equal_time = new Time(11, 30)
    it("isEqual()", () => {
        expect(time.isEqual(equal_time)).toBe(true)
    })

    const not_equal_time = new Time(11, 31)
    it("areEqual()", () => {
        expect(time.isEqual(not_equal_time)).toBe(false)
    })

})