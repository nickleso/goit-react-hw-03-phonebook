import css from './App.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contact__list}>
      {contacts.map(contact => (
        <li className={css.contact__item} key={contact.id}>
          <p>
            {contact.name}: <span>{contact.number}</span>
          </p>
          <button
            className={css.contact__button}
            type="button"
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
