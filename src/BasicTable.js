import React, { useMemo }from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

export const BasicTable = (students) => {
    
    const columns = useMemo(() => COLUMNS, [])
    //const data = useMemo(() => MOCK_DATA, [])
   // const columns = useMemo(() => 
    //students[0] 
    //? Object.keys(students[0])
        //.map((key) => {
            //return { Header: key, accessor: key }
        //})
    //: [],
    //[students])

    const data = useMemo(() => students, [students])

   const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    })

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
               {rows.map(row => {
                       prepareRow(row)
                       return (
                           <tr {...row.getRowProps()}>
                               {
                                   row.cells.map( cell => {
                                       return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                   })
                               }
                           </tr>
                       )
                   })
                }
            </tbody>
        </table>
    )
}