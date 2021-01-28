import React from 'react';
import ContactsList from './ContactsList.jsx'
import contactsTable from '../style/contactsTable.css'

const ContactsTable = ({contacts}) => {
  
  return  (
    <div className='container-table'>
      <table className='content-table'>
        <thead>
          <tr className='content-table-head'>
              <th>Contact</th>
              <th>Phone</th>
              <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => 
            <ContactsList 
              firstName={contact.firstName}
              lastName={contact.lastName}
              email={contact.email}
              phone={contact.phone}
              key={contact.id}
            />
            )}
        </tbody>
      </table>
    </div>
  )
}

export default ContactsTable;