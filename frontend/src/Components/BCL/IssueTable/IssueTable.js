import React from 'react'
import { useTable, usePagination } from 'react-table'
import { Container, Row, Col, Table, Card,Button } from 'react-bootstrap'



function IssueTable({ columns, data }, props) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 1 },
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>

      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Button size="sm" variant="dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {'<<'}
                </Button>{' '}
                <Button size="sm" variant="dark" onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {'PREV'}
                </Button>{' '}
                <Button size="sm" variant="dark" onClick={() => nextPage()} disabled={!canNextPage}>
                  {'NEXT'}
                </Button>{' '}
                <Button size="sm" variant="dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {'>>'}
                </Button>{' '}
              </Col>
              <Col>
              <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            </Col>
            <Col>
            <span>
              Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                max={pageCount}
                min="1"
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            </Col>
            </Row>
          </Container>
          <div className="pagination">


            
          </div>
        </Card.Body>
      </Card>

      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      {/* ******************** */}
    </>


  )
}

export default IssueTable