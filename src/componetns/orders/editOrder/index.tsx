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

const EditOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const storedOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const existingOrder = storedOrders.find((o) => o.id === Number(id));

    if (!existingOrder) {
      alert("Order not found");
      navigate("/orders");
      return;
    }

    if (user?.role === "customer" && existingOrder.customerEmail !== user.email) {
      alert("You are not authorized to edit this order");
      navigate("/orders");
      return;
    }

    // Restrict editing if order is accepted or canceled
    if (existingOrder.status === "Accepted" || existingOrder.status === "Canceled") {
      alert("Cannot edit this order");
      navigate("/orders");
      return;
    }

    // Restrict editing after 1 hour for customer
    const now = new Date();
    const orderTime = new Date(existingOrder.createdAt);
    const diffMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);

    if (user?.role === "customer" && diffMinutes > 60) {
      alert("You can only edit within 1 hour");
      navigate("/orders");
      return;
    }

    setOrder(existingOrder);
    setProductName(existingOrder.productName);
    setAmount(existingOrder.amount);
  }, [id, user, navigate]);

  const handleSave = () => {
    if (!order) return;

    const storedOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = storedOrders.map((o) =>
      o.id === order.id
        ? { ...o, productName, amount, status: "Edited" } // mark as edited
        : o
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    alert("Order updated successfully");
    navigate("/orders");
  };

  if (!order) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Order #{order.id}</h2>
      <div className={styles.formGroup}>
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => navigate("/orders")}>Cancel</button>
      </div>
    </div>
  );
};

export default EditOrder;
