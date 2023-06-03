import React from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './Contacts/Contacts';
class App extends React.Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    this.setState({
      contacts: savedContacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('changed');
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
