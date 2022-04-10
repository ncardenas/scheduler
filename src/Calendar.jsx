const Calendar = ({schedule}) => {
    function header() {
        let days = Object.keys(schedule.getMeetings())
        console.log(days)
        days = days.map(day => <th>{day}</th>)
        const time = <th>time</th>
        return [time, ...days]
    }

    return (
        <table>
            <tbody>

                <tr>
                {header()}
                </tr>

                <tr>

                </tr>

            </tbody>
        </table>
    )
}

export default Calendar