import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../common/modal";

interface Order {
  id: number;
  userName: string;
  amount: number;
  status: "Paid" | "Pending" | "Cancelled";
  date: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    const sorted = stored.sort((a: Order, b: Order) => b.id - a.id);
    setOrders(sorted);
  }, []);

  const handleAddOrder = () => {
    navigate("/create-order");
  };

  const handleDelete = () => {
    if (deleteId === null) return;

    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    const updated = stored.filter((o: Order) => o.id !== deleteId);

    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(updated);

    setDeleteId(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Orders</h2>

      <div className={styles.topBar}>
        <button className={styles.addButton} onClick={handleAddOrder}>
          + Create Order
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.userName}</td>
              <td>₹{o.amount}</td>

              <td>
                <span className={`${styles.badge} ${styles[o.status.toLowerCase()]}`}>
                  {o.status}
                </span>
              </td>

              <td>{o.date}</td>

              <td className={styles.actions}>
                <button 
                  className={styles.edit}
                  onClick={() => navigate(`/edit-order/${o.id}`)}
                >
                  Edit
                </button>

                <button 
                  className={styles.delete}
                  onClick={() => setDeleteId(o.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className={styles.noData}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {deleteId !== null && (
        <ConfirmModal
          title="Delete Order"
          message="Are you sure you want to delete this order?"
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Orders;
