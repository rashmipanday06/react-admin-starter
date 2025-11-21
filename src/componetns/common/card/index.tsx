import useCountUp from "../../../hooks/useCountUp";
import styles from "./style.module.css";

interface CardProps {
  value: number | string;
  label: string;
}

const Card: React.FC<CardProps> = ({ value, label }) => {
  const isCurrency = typeof value === "string" && value.includes("₹");
  const animatedValue = useCountUp(value);

  return (
    <div className={styles.card}>
      <h3>{isCurrency ? `₹${animatedValue}` : animatedValue}</h3>
      <p>{label}</p>
    </div>
  );
};

export default Card;
