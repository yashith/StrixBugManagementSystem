import React, { useState,useEffect } from 'react';
import SetPagination from '../../Common/Pagination/Pagination';
import { Table, Row, Col, Button, Card, NavLink, Form, FormControl, Modal, Badge } from 'react-bootstrap';
import IssueForm from '../CreateIssue/IssueForm'
import Issuecard from '../IssueTable/Issecard'
import './table.css';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './IssueBacklogBCL.scss'
import GetTickets from '../../../Services/TicketService';
import API from '../../../Services/Base';


//my
function bagetype(priority) {

  switch (priority) {
    case 'High':
      return 'danger';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'success'
  }
}

function IssueBacklogBCL() {

  const [isModelOpen, setisModelOpen] = useState(false);
  const [buglist, setbuglist] = useState([])
  const [buglist2,setbuglist2]=useState([])

  function tableticket(e) {
    for (var i = 0; i < buglist.length; i++) {
      if (buglist[i].id === e) {
        render(<Issuecard priority={buglist[i].priority} type={buglist[i].type} summary={buglist[i].summary} variant={bagetype(buglist[i].priority)} />);
      }
    }

  }
  useEffect(() => {
    
    API.get('getTicket/')
    .then(response=>setbuglist2(response.data))
   
  },)

  return (
    <div className="">

      <Row >
        {/* <div className="col-md-2 bg-dark">
          <Col className=" text-white  ">

            <Row> <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist"> LOGO</NavLink>
            </Row>
            <Row> <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist">  Summary</NavLink>
            </Row>
            <Row> <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist"> Dashboard</NavLink>
            </Row>
            <Row> <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist"> Reports </NavLink>
            </Row>



          </Col>

        </div> */}
        <div className="ml-2 mt-2 col-md-9">
          <Col className="">
            <Row className="">
              <Card>
                <Card.Body>
                  <Card.Title>Project 1</Card.Title>
                  <Card.Text>
                    Description <br></br>
                        Project Name, ID,
                        Customer ID
                     </Card.Text>

                </Card.Body>
              </Card>
            </Row>
            <Row className="border border-dark mt-2 mb-2" >
              <div className="d-flex p-2 bd-highlight">
                <Col md={4}>


                  <Button className="mr-sm-2" variant="info" data-toggle="tooltip" title="Go to issues"
                    onClick={() => setisModelOpen(true)}
                  >
                    Add Issue</Button>
                  <Modal size="lg" show={isModelOpen}>
                    <Modal.Body>
                      <IssueForm cl={() => setisModelOpen(false)} buglist={buglist} setbuglist={setbuglist} />

                    </Modal.Body>

                  </Modal>

                </Col>
                <Col md={3}>
                  {/* sort here */}

                </Col>
                <Col md={5}>
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" /> {/* Margin right(Padding , Small and up by 2) */}
                  </Form>
                </Col>
              </div>
            </Row>
            {/* <Row>

                          {
                              bug.map((bug) => <Issuecard id={'#' + bug.id} summ={bug.Summary} priority={bug.priority} badgetype={bagetype(bug.priority)} />)
                          }


                      </Row> */}
            <Row>
              <Table>
                <thead>
                  <tr>
                    <th>
                      #id
                    </th>
                    <th>
                      Title
                    </th>
                    <th>
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    buglist2.map((bug) =>
                      <tr className="highligh" id={bug.id} onClick={() => { tableticket(bug.id) }} key={bug.id}>
                        <td>{'#' + bug.id}</td>
                        <td className="noover"><div>{bug.issuename}</div></td>
                        <td><Badge variant="Danger">{bug.priority}</Badge></td>
                      </tr>
                    )                    
                  }
                </tbody>
              </Table>
            </Row>



            <Row >

              <div>
                <Card className=" mu-2">
                  <Card.Body>

                    {/* <SetPagination
                      IssuePerPage={IssuePerPage}
                      totalIssues={bugs.length}
                      paginate={paginate}
                    /> */}

                  </Card.Body>
                </Card>
              </div>
            </Row>
          </Col>
        </div>
      </Row>

    </div>
  )


}


export default IssueBacklogBCL;