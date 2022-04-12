import Schedule from './Schedule'
import styles from './Calendar.scss'

const Calendar = ({schedule}) => {
    function header() {
        console.log(schedule)
        let days = Object.keys(schedule.getMeetings())
        days = days.map( (day, index) => <div key={index}>{day}</div>)
        const time = <div key='time'>time</div>
        return [time, ...days]
    }

    function formatMeetings(meetings) {
        let result = []
        for (const meeting of meetings) {
            const start_hours = meeting.getStart().getHour()
            const start_minutes = meeting.getStart().getMinute()
            const start = start_hours.toString() + ':' + start_minutes.toString()

            const end_hours = meeting.getEnd().getHour()
            const end_minutes = meeting.getEnd().getMinute()
            const end = end_hours.toString() + ':' + end_minutes.toString()
            const combine = start + ' to ' + end
            result.push(<div key={combine}>{combine}</div>)
        }
        return result
    }

    function times() {
        // Time | Day
        // time | group
        const week = schedule.getMeetings()
        console.log(week)
        const result = []
        for (const [day, meetings] of Object.entries(week)) {
            console.log(day)
            console.log(meetings)
            result.push(formatMeetings(meetings))
            break
        }
        return result
    }

    return (
        <div className={styles.header}>
            {header()}
            {times()}
        </div>
        
    )
}

export default Calendar