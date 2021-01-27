import React, { useState, useEffect } from "react"
import axios from 'axios'
import ContactsTable from './components/ContactsTable.jsx'

const App = () => {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    axios.get('/contacts')
      .then(contacts => setContacts(contacts.data.contacts))
  }, [])
  
  return (
    <div>
      <ContactsTable contacts={contacts}/>
    </div>
  )
}

export default App;