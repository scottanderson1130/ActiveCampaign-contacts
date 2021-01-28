import React from 'react';

const ContactsList = ({firstName, lastName, tags, value, deals, city, state}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    stlye: 'currency',
    currency: 'USD'
  })
  return (
      <tr>
        <td className='table-content-name'>{firstName} {lastName}</td>
        <td className='table-content-value'>${formatter.format(Math.ceil(value * 0.01))}</td>
        <td className='table-content-location'>{city}, {state}</td>
        <td className='table-content-deals'>{deals}</td>
        <td className='table-content-tags'>{tags.join(', ')}</td>
      </tr>
  )
}

export default ContactsList;