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

    addMinutes(more_minutes: number): Time {
        if (more_minutes < 0) return // not mplementing negatives until needed
        // 1) Total Minutes = Add current and input mins
        // 2) Hours = Total Minutes / 60 mins
        // 3) Remining Minutes = Total Minutes - (Hours* 60 mins)
        // 4) Add Hours and Remaining Minutes to object

        var total_mins = this.minute + more_minutes
        var hours = Math.floor(total_mins / 60)
        var remaining_mins = total_mins - (hours*60)
        var hour = this.hour + hours
        return new Time(hour, remaining_mins)
    }

    greaterThanOrEqualTo(rhs: Time): boolean {
        return this.getTimeInMins() >= rhs.getTimeInMins()
    }

    equalTo(rhs: Time): boolean {
        return this.getTimeInMins() === rhs.getTimeInMins()
    }

    lessThan(rhs: Time): boolean {
        return this.getTimeInMins() < rhs.getTimeInMins()
    }
}

export default Time