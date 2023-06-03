import PropTypes from 'prop-types';
import React from 'react';
import css from './ContactForm.module.css';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  changeHandler = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      name: '',
      number: '',
    });
    this.props.addingNewContact(e);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className={css.form}>
          <label className={css.label}>
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.changeHandler}
              className={css.input}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label className={css.label}>
            Number
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.changeHandler}
              className={css.input}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit" className={css.button}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  addingNewContact: PropTypes.func.isRequired,
};
