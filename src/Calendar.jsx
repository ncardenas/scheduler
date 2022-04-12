import Schedule from './Schedule'

const Calendar = ({schedule}) => {
    function header() {
        console.log(schedule)
        let days = Object.keys(schedule.getMeetings())
        days = days.map( (day, index) => <th key={index} >{day}</th>)
        const time = <th key='time'>time</th>
        return [time, ...days]
    }

    function rows() {
        // Time | Day
        // time | group
        const entries = Object.entries(schedule)
        const result = entries.map( (day, index) => {

        })
    }

    return (
        <table>
            <tbody>

                <tr>
                {header()}
                </tr>

                <tr>
                {rows()}
                </tr>

            </tbody>
        </table>
    )
}

export default Calendar