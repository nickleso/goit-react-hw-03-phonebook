import css from './App.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={css.form}>
      <label className={css.form__label}>
        Find contacts by name
        <input name="name" value={value} onChange={onChange}></input>
      </label>
    </div>
  );
};

export default Filter;
