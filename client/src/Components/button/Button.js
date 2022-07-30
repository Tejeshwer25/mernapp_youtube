import styles from "./Button.module.css";

function Button({ value, onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {value}
    </button>
  );
}

export default Button;
