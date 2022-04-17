import React from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

function GlobalFilter({
                       preGlobalFilteredRows,
                       globalFilter,
                       setGlobalFilter
                      })
{
 const count = preGlobalFilteredRows.length
 const [value, setValue] = React.useState(globalFilter)
 const onChange = useAsyncDebounce(value => {
                    setGlobalFilter(value || undefined)
                  }, 200)

 return (
   <span>
     Search:{' '}
     <input
       value={value || ""}
       onChange={e => {
         setValue(e.target.value);
         onChange(e.target.value);
       }}
       placeholder={`${count} records...`}
       style={{
         fontSize: '1.1rem',
         border: '0',
       }}
     />
   </span>
 )
}

// Define a default UI for filtering
function DefaultColumnFilter({
                              column: { filterValue, preFilteredRows, setFilter },
                            })
{
 const count = preFilteredRows.length

 return (
   <input
     value={filterValue || ''}
     onChange={e => {
       setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
     }}
     placeholder={`Search ${count} records...`}
   />
 )
}

// function DefaultColumnInput ({})

function Table() {

 const data = React.useMemo(
     () => [
       {
         col1: '1',
         col2: 'Nick',
         col3: '2',
         col4: 'Speach',
         col5: 'Monday',
         col6: '0800',
         col7: '1300',
       },
       {
         col1: '2',
         col2: 'Ashley',
         col3: '2',
         col4: 'Speach',
         col5: 'Monday',
         col6: '0800',
         col7: '1300',
       },
       {
         col1: '3',
         col2: 'Luna',
         col3: '2',
         col4: 'Speach',
         col5: 'Monday',
         col6: '0800',
         col7: '1300',
       },
       {
         col1: '4',
         col2: 'Gab',
         col3: '2',
         col4: 'Speach',
         col5: 'Monday',
         col6: '0800',
         col7: '1300',
       },
       {
         col1: '5',
         col2: 'Landon',
         col3: '2',
         col4: 'Speach',
         col5: 'Monday',
         col6: '0800',
         col7: '1300',
       },
     ],
     []
 )

 // Header Groups
 const columns = React.useMemo(
     () => [
       {
         Header: 'ID',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
         Header: 'Name',
         accessor: 'col2',
       },
       {
         Header: 'Grade',
         accessor: 'col3',
       },
       {
         Header: 'Topic',
         accessor: 'col4',
       },
       {
         Header: 'Day',
         accessor: 'col5',
       },
       {
        Header: 'Start Time',
        accessor: 'col6',
      },
      {
        Header: 'End Time',
        accessor: 'col7',
      },
     ],
     []
 )

 const defaultColumn = React.useMemo( () => ({
     // Let's set up our default Filter UI
     Filter: DefaultColumnFilter,
    //  Input: DefaultInput,
   }),[])

 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
   state,
   visibleColumns,
   preGlobalFilteredRows,
   setGlobalFilter,
 } = useTable(
   {
     columns,
     data,
     defaultColumn, // Be sure to pass the defaultColumn option
   },
   useFilters,
   useGlobalFilter,
   useSortBy
 );

 return (
     <div>
       <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
         <thead>
         {headerGroups.map(headerGroup => (
             <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                   <th
                       {...column.getHeaderProps(column.getSortByToggleProps())}
                       style={{
                         borderBottom: 'solid 3px red',
                         color: 'black',
                       }}
                   >
                     {column.render('Header')}
                     <span>
                       {column.isSorted
                           ? column.isSortedDesc
                               ? '🔽'
                               : '🔼'
                           : ''}
                    </span>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                   </th>
               ))}
             </tr>
         ))}
                                       
         <tr>
           <th
             colSpan={visibleColumns.length}
             style={{
               textAlign: 'left',
             }}
           >
             <GlobalFilter
               preGlobalFilteredRows={preGlobalFilteredRows}
               globalFilter={state.globalFilter}
               setGlobalFilter={setGlobalFilter}
             />
           </th>
         </tr>
         </thead>
         <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()}>
                 {row.cells.map(cell => {
                   return (
                       <td
                           {...cell.getCellProps()}
                           style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}
                       >
                         {cell.render('Cell')}
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>
     </div>
 );
}

export default Table;