import {useEffect, useState} from "react"
import "./App.css"
import ClientsInLine from "./Components/CclientsInLine"
import InService from "./Components/inService"
import axios from "axios"
import UserInput from "./Components/Input"
import Header from "./Header"
import {Col, Container} from "react-bootstrap"

function App() {
  const [users, setUsers] = useState([])
  const [updatePage, setUpdatePage] = useState(true)

  const updatePageCb = () => {
    setUpdatePage(!updatePage)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://6061cac0ac47190017a71c0d.mockapi.io/api/Users/Persons"
        )

        setUsers(response.data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [updatePage])

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Header />
          <Col></Col>
          <InService updatePageCb={updatePageCb} users={users} />

          <UserInput updatePageCb={updatePageCb} />
          <ClientsInLine users={users} />
        </Container>
      </header>
    </div>
  )
}

export default App
