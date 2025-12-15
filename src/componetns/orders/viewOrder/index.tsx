import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./style.module.css";
import { useAuth } from "../../context/authContext";

interface Order {
  id: number;
  customerEmail: string;
  productName: string;
  status: "Pending" | "Accepted" | "Canceled" | "Edited";
  amount: number;
  createdAt: string;
}

const ViewOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const existingOrder = storedOrders.find((o) => o.id === Number(id));

    if (!existingOrder) {
      alert("Order not found");
      navigate("/orders");
      return;
    }

    if (user?.role === "customer" && existingOrder.customerEmail !== user.email) {
      alert("You are not authorized to view this order");
      navigate("/orders");
      return;
    }

    setOrder(existingOrder);
  }, [id, user, navigate]);

  const getStatusClass = (status: Order["status"]) => {
    switch (status) {
      case "Accepted":
        return styles.accepted;
      case "Pending":
        return styles.pending;
      case "Canceled":
        return styles.canceled;
      case "Edited":
        return styles.edited;
      default:
        return "";
    }
  };

  if (!order) return null;

  return (
    <div className={styles.viewContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Order Details</h2>
        <div className={styles.row}>
          <span className={styles.label}>Order ID:</span>
          <span>{order.id}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Customer Email:</span>
          <span>{order.customerEmail}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Product:</span>
          <span>{order.productName}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Amount:</span>
          <span>₹{order.amount}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Status:</span>
          <span className={`${styles.status} ${getStatusClass(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Created At:</span>
          <span>{new Date(order.createdAt).toLocaleString()}</span>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={() => navigate("/orders")}>Back to Orders</button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
