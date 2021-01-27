import React from 'react';

const phoneFormatter = (number) => {
  let ext;
  let returnNumber;
  let prefix;
  
  const formatter = (number) => {
    const phone = number.split(/\D/)
    return(`(${phone[0]})${phone[1]}-${phone[2]}`)
  }

  const num = number.split('x');
  num.length > 1 ? ext = num[1] : ext = null;
  let phoneNumber = num[0] 
  
  const correct = /^[(][0-9]{3}[)][-\s/0-9]*$/g;
  const dotDashPhone = /^[0-9]{3}[\.-][0-9]{3}[\.-][0-9]{4}$/g;
  const national = /^(\+1|001)/;
  const numsOnly = /^(\d{3})(\d{3})(\d{4})$/;

  if (correct.test(phoneNumber)) returnNumber = phoneNumber
  if (dotDashPhone.test(phoneNumber)) returnNumber = formatter(phoneNumber)
  if (national.test(phoneNumber)) {
    const parse = phoneNumber.split('-')
    returnNumber = formatter(parse.splice(1).join('-'))
  }
  if (numsOnly.test(phoneNumber)) {
    let match = phoneNumber.match(numsOnly);
    returnNumber = `(${match[1]})${match[2]}-${match[3]}`;
  }

  return ext ? `${returnNumber} ext.${ext}` : returnNumber
  
}

const ContactsList = ({firstName, lastName, phone, email}) => {
  return (
      <tr>
        <td>{firstName} {lastName}</td>
        <td>{phoneFormatter(phone)}</td>
        <td>{email}</td>
      </tr>
  )
}

export default ContactsList;