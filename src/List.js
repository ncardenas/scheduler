const List = ({students}) => (
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Grade</th>
                <th>Topic</th>
            </tr>

            {students.map((student,index) => (
                <tr key={index}>
                    <td>{student.getId()}</td>
                    <td>{student.getName()}</td>
                    <td>{student.getGrade()}</td>
                    <td>{student.getTopic()}</td>
                    {/* <>{student.getAvailability('monday')}</> */}
                </tr>
            ))}
        </tbody>
    </table>
)

export default List