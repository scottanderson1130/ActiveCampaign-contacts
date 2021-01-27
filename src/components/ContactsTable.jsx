import React from 'react';
import ContactsList from './ContactsList.jsx'

const ContactsTable = ({contacts}) => {
  
  return  (
    <div>
      <table>
        <thead>
        <tr>
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