import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Ul, Li, Btn } from './Contacts.styled';

class ContactList extends React.Component {
  render() {
    const filteredContacts = this.props.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.props.filter.toLowerCase())
    );
    return (
      this.props.contacts.length > 0 && (
        <>
          <Ul>
            {filteredContacts.length > 0
              ? filteredContacts.map(({ name, number }) => (
                  <Li key={shortid.generate()}>
                    {name} {number}
                    {
                      <Btn
                        type="button"
                        id={name}
                        onClick={this.props.deleteContact}
                      >
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
  }
}

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
