import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useAuth } from "../../context/authContext";

interface Order {
  id: number;
  customerEmail: string;
  status: string; // "Pending", "Accepted", "Canceled", "Edited"
  amount: number;
  createdAt: string;
}

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders: Order[] = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const filteredOrders =
      user?.role === "customer"
        ? storedOrders.filter((o) => o.customerEmail === user.email)
        : storedOrders;

    setOrders(filteredOrders);
  }, [user]);

  const updateOrderStatus = (order: Order, newStatus: string) => {
    const updatedOrders = orders.map((o) =>
      o.id === order.id ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleCancel = (order: Order) => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const diffMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);

    if (user?.role === "customer" && diffMinutes > 60) {
      alert("You can cancel an order only within 1 hour of creation.");
      return;
    }

    if (order.status === "Accepted") {
      alert("Order cannot be canceled as it is already accepted by manager.");
      return;
    }

    updateOrderStatus(order, "Canceled");
  };

  const handleEdit = (order: Order) => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const diffMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);

    if (user?.role === "customer" && diffMinutes > 60) {
      alert("You can edit an order only within 1 hour of creation.");
      return;
    }

    if (order.status === "Accepted") {
      alert("Order cannot be edited as it is already accepted by manager.");
      return;
    }

    updateOrderStatus(order, "Edited");
    alert(`Order #${order.id} edited successfully`);
  };

  const getStatusClass = (status: string) => {
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
  const handleCreateOrder = () => {
    // Navigate to create order page or open modal
    alert("Redirect to create order page");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Orders</h2>

      {user?.role === "customer" && (
        <div className={styles.topBar}>
        <button className={styles.addButton} onClick={handleCreateOrder}>
          + Create Order
        </button>
        </div>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((o) => {
              const now = new Date();
              const orderTime = new Date(o.createdAt);
              const diffMinutes =
                (now.getTime() - orderTime.getTime()) / (1000 * 60);
              const canModify =
                user?.role !== "customer" ||
                (diffMinutes <= 60 &&
                  o.status !== "Canceled" &&
                  o.status !== "Accepted");

              return (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.customerEmail}</td>
                  <td className={getStatusClass(o.status)}>{o.status}</td>
                  <td>₹{o.amount}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEdit(o)} disabled={!canModify}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleCancel(o)}
                      disabled={!canModify}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className={styles.noData}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
