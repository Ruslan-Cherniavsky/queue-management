import React, {useState} from "react"
import {Row, Col, Container, Button} from "react-bootstrap"
import axios from "axios"

const InService = ({users, updatePageCb}) => {
  const filteredUsers = users.filter((user) => user.Status === 2)

  const nextClient = async () => {
    if (filteredUsers.length > 0) {
      const updatedUser = filteredUsers[0]
      updatedUser.Status = 1

      try {
        const response = await axios.put(
          `https://6061cac0ac47190017a71c0d.mockapi.io/api/Users/Persons/${updatedUser.id}`,
          updatedUser
        )
        console.log("Person updated:", response.status)

        if (response.status === 200) {
          const filteredUsersInQueue = users.filter((user) => user.Status === 0)
          if (filteredUsersInQueue && filteredUsersInQueue.length > 0) {
            const updatedUserFromQueue = filteredUsersInQueue[0]
            updatedUserFromQueue.Status = 2
            setTimeout(async () => {
              try {
                const response2 = await axios.put(
                  `https://6061cac0ac47190017a71c0d.mockapi.io/api/Users/Persons/${updatedUserFromQueue.id}`,
                  updatedUserFromQueue
                )

                console.log("Person updated:", response2.data)

                console.log(updatedUserFromQueue)
              } catch (error) {
                console.error("Error updating person from queue:", error)
              }
              updatePageCb()
            }, 2000)
          }
        }

        console.log(filteredUsers)
      } catch (error) {
        console.error("Error updating person:", error)
        throw error
      }
    }
  }

  return (
    <>
      <Container>
        <h2>In Service</h2>
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
                      <td>{user.id}</td>
                      <td>{user.FullName}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={nextClient} className="btn btn-primary">
              Next client
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default InService
