const List = ({students}) => {
    return students.map((student,index) => 
        {
            return (
                <div key={index}>
                    <>{student.name}</>
                    <>{student.disability}</>
                    <>{student.availability}</>
                </div>
            )
        }
    )
}

export default List