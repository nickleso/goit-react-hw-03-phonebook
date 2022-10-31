import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('myContacts');
    const parsedContacts = JSON.parse(storedContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('myContacts', JSON.stringify(contacts));
    }
  }

  addContact = (name, number) => {
    const normalizedFilter = name.toLowerCase();
    const checkByName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedFilter
    );

    if (checkByName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(10),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFiltredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <section className={css.phonebook}>
        <div className={css.phonebook__wrap}>
          <h1 className={css.phonebook__title}>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </div>

        <div className={css.contacts__wrap}>
          <h2 className={css.phonebook__title}>Contacts</h2>
          <Filter value={this.state.filter} onChange={this.changeFilter} />
        </div>

        <ContactList
          contacts={this.getFiltredContacts()}
          onDeleteContact={this.deleteContact}
        />
      </section>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    contacts: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
  }),
};

export default App;
