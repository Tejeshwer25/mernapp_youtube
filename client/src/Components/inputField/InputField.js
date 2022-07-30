import styles from "./InputField.module.css";

function InputField({
  label,
  type,
  name,
  placeholder,
  checked,
  value,
  onChange,
}) {
  return (
    <>
      {type === "checkbox" ? (
        <label
          className={styles.checkbox}
          onClick={onChange}
          id={checked ? styles.active : styles.notActive}
        >
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            checked={checked}
          />
          {label}
        </label>
      ) : (
        <input
          className={styles.inputField}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          checked={checked}
        />
      )}
    </>
  );
}

export default InputField;
