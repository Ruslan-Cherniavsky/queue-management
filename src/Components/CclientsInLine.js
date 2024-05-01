import React from "react"
import {Row, Col, Container, Button} from "react-bootstrap"

const ClientsInLine = ({users}) => {
  const filteredUsers = users.filter((user) => user.Status === 0)

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Number in line</th>
                    <th>Full Name</th>
                    <th>Check-in Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>

                      <td>{user.FullName}</td>

                      <td>
                        <td>
                          {new Date(user.dateTime * 1000).toLocaleTimeString(
                            "en-US",
                            {
                              hour12: false,
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ClientsInLine
