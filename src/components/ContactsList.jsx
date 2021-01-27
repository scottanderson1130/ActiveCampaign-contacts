import React from 'react';

const ContactsList = ({ firstName, lastName, phone, email, id }) => {
  console.log(firstName, lastName, email, phone, id)
  return (
      <tr>
        <td>Monte Falco</td>
        <td>1658</td>
        <td>Parco Foreste Casentinesi</td>
      </tr>
  )
}

export default ContactsList;