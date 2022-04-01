class Time {
    hour: number
    minute: number

    constructor(hour: number=0, minute: number=0) {
        this.hour = hour
        this.minute = minute

        if (minute > 60) {
            this.hour += minute / 60
            this.minute += minute % 60
        }
    }

    getHour() : number { return this.hour }
    getMinute() : number { return this.minute }
    getTimeInMins() : number { return (this.hour*60)+this.minute}
    areEqual(rhs: Time) : boolean {
        return rhs.getTimeInMins() === this.getTimeInMins()
    }
}

export default Time