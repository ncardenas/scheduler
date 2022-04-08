const List = ({students}) => {
    return students.map((student,index) => {
        return (
            <div key={index}>
                <>{student.getId()}</>
                <>{student.getName()}</>
                <>{student.getGrade()}</>
                <>{student.getDisability()}</>
                {/* <>{student.getAvailability('monday')}</> */}
            </div>
        )
    })
}

export default List