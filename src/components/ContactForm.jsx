import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './App.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  onFormChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;
    this.props.onSubmit(name, number);

    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.onFormSubmit}>
        <label className={css.form__label}>
          Name
          <input
            value={name}
            onChange={this.onFormChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.form__label}>
          Number
          <input
            value={number}
            onChange={this.onFormChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.form__button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

INITIAL_STATE.propTypes = {
  name: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
};

export default ContactForm;
