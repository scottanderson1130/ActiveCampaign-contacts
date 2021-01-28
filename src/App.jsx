import React, { useState, useEffect } from "react"
import axios from 'axios'
import ContactsTable from './components/ContactsTable.jsx'
import app from './style/app.css'


const App = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get('/contacts')
      .then(contacts => {
        setContacts(contacts.data)
        setLoading(false)
      }
      )
  }, [])
  
  return (
    <div className={app}>
      {loading ? (
      <div>
        <h1>Loading Data...</h1>
      </div>) : 
      <ContactsTable contacts={contacts}/> 
      }
    </div>
  )
}

export default App;