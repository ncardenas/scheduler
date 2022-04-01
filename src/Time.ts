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
    isEqual(rhs: Time) : boolean {
        return rhs.getTimeInMins() === this.getTimeInMins()
    }

    addMinutes(more_minutes: number): Time {
        if (more_minutes < 0) return // not mplementing negatives until needed
        // 1) Total Minutes = Add current and input mins
        // 2) Hours = Total Minutes / 60 mins
        // 3) Remining Minutes = Total Minutes - (Hours* 60 mins)
        // 4) Add Hours and Remaining Minutes to object

        var total_mins = this.minute + more_minutes
        var hours = total_mins / 60
        var remaining_mins = total_mins - (hours*60)
        var hour = this.hour + total_mins/60
        return new Time(hour, remaining_mins)
    }
}

export default Time