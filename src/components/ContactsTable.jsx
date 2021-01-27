import React from 'react';
import ContactsList from './ContactsList.jsx'

const ContactsTable = (contacts) => {
  console.log(contacts)
  return  (
    <div>
      <table>
        <thead>
        <tr>
            <th>Id</th>
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
              id={contact.id}
            />
            )}
        </tbody>
      </table>
    </div>
  )
}

export default ContactsTable;