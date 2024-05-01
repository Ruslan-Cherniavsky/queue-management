import React, {useState} from "react"
import axios from "axios"
import {Alert, Button, Col, Container, Row} from "react-bootstrap"

const UserInput = ({updatePageCb}) => {
  const [userName, setUserName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userName.trim()) {
      setError("Please enter a valid Full Name")
      return
    }

    const userData = {
      dateTime: Math.floor(Date.now() / 1000),
      FullName: userName,
      Status: 0,
    }
    updatePageCb()

    try {
      const response = await axios.post(
        "https://6061cac0ac47190017a71c0d.mockapi.io/api/Users/Persons",
        userData
      )
      console.log("Data submitted:", response.data)
      setUserName("")
    } catch (error) {
      console.error("Error submitting data:", error)
    }
  }

  return (
    <>
      <Container>
        {error && <Alert variant="danger">{error}</Alert>}
        <h2>Clients in line</h2>

        <Row>
          <Col xl={4} md={8} sm={8} xs={8}>
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              name="FullName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Col>
          <Col xl={2} md={4} cm={4} xs={4}>
            <Button onClick={handleSubmit} className="btn btn-primary">
              + Add to the line
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserInput
