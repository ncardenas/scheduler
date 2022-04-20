export function getColumns() {
    const column_names = ['id', 'name', 'grade', 'topic', 'day', 'start_time', 'end_time']
    return column_names
    ? column_names.map(name => {return { Header:name, accessor: name }})
    : []
}