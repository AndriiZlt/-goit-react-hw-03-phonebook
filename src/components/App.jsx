import React from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './Contacts/Contacts';
class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    this.setState({
      contacts: [...savedContacts],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addingNewContact = e => {
    const { name, number } = e.currentTarget;
    let isTaken = false;
    for (let contact of this.state.contacts) {
      if (contact.name.toLowerCase() === name.value.toLowerCase()) {
        isTaken = true;
        continue;
      }
    }

    if (!isTaken) {
      const contactId = shortid.generate();
      const newContact = {
        id: contactId,
        name: name.value,
        number: number.value,
      };

      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    } else {
      alert(`${name.value} is already in contacts.`);
    }
  };

  appChangeHandler = (name, value) => {
    this.setState({ [name]: value });
  };

  deleteContact = e => {
    const itemToDelete = e.currentTarget.id;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.name !== itemToDelete
      ),
    }));
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
          fontFamily: 'Roboto',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm addingNewContact={this.addingNewContact} />
        <h2>Contacts</h2>
        <Filter
          appChangeHandler={this.appChangeHandler}
          filter={this.state.filter}
        />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
