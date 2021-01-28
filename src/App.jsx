import React, { useState, useEffect } from "react"
import axios from 'axios'
import ContactsTable from './components/ContactsTable.jsx'
import app from './style/app.css'


const App = () => {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    axios.get('/contacts')
      .then(contacts => setContacts(contacts.data.contacts))
  }, [])
  
  return (
    <div className={app}>
      <ContactsTable contacts={contacts}/>
    </div>
  )
}

export default App;