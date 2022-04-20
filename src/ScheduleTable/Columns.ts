export function getColumns() {
    const column_names = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    return column_names
    ? column_names.map(name => {return { Header:name, accessor: name }})
    : []
}
