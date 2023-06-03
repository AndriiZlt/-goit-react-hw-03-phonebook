import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Ul, Li, Btn } from './Contacts.styled';

const ContactList = ({ contacts, filter, deleteContact }) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  console.log('g', filteredContacts);
  return (
    contacts.length > 0 && (
      <>
        <Ul>
          {filteredContacts.length > 0
            ? filteredContacts.map(({ name, number }) => (
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
