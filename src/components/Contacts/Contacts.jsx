import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Ul, Li, Btn } from './Contacts.styled';

const ContactList = ({ contacts, filter, deleteContact }) => {
  console.log('s', contacts);
  const filteredUsers = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    contacts.length > 0 && (
      <>
        <Ul>
          {filteredUsers.length > 0
            ? filteredUsers.map(({ name, number }) => (
                <Li key={shortid.generate()}>
                  {name} {number}
                  {
                    <Btn type="button" id={name} onClick={deleteContact}>
                      Delete
                    </Btn>
                  }
                </Li>
              ))
            : 'No matches found..'}
        </Ul>
      </>
    )
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
