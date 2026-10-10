import styles from "./style.module.css";

interface CardProps {
  value: string | number;
  label: string;
}

const Card = ({ value, label }: CardProps) => {
  return (
    <div className={styles.card}>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
};

export default Card;