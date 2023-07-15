// TODO: Make availability the column and have sub columns for day, start/end time
export function getColumns() {
    const column_names = ['id', 'name', 'grade', 'topic', 'availability']
    return column_names
    ? column_names.map(name => {return { Header:name, accessor: name }})
    : []
}