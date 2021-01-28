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
              <th>Total Value</th>
              <th>Location</th>
              <th>Deals</th>
              <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map(contact => 
            <ContactsList 
              firstName={contact.firstName}
              lastName={contact.lastName}
              tags={contact.tags}
              value={contact.value}
              deals={contact.deals}
              city={contact.city}
              state={contact.state}
              key={contact.id}
            />
            )}
        </tbody>
      </table>
    </div>
  )
}

export default ContactsTable;