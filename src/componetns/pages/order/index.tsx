import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useAuth } from "../../context/authContext";

interface Order {
  id: number;
  customerEmail: string;
  productName: string; // added product name
  status: "Pending" | "Accepted" | "Canceled" | "Edited";
  amount: number;
  createdAt: string;
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
// const navigate=useNavigate()
  // Load orders based on role
const loadOrders = () => {
  const storedOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
  if (!user) {
    setOrders([]);
    return;
  }

  let filteredOrders: Order[] = [];

  switch (user.role) {
    case "admin":
    case "manager":
      filteredOrders = storedOrders; // all orders
      break;
    case "customer":
      filteredOrders = storedOrders.filter((o) => o.customerEmail === user.email);
      break;
    default:
      filteredOrders = [];
  }

  // Sort by createdAt descending (newest first)
  filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  setOrders(filteredOrders);
};

  useEffect(() => {
    loadOrders();
  }, [user]);

  const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
    const storedOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = storedOrders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    loadOrders();
  };

  const handleCancel = (order: Order) => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const diffMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);

    if (user?.role === "customer" && diffMinutes > 60) {
      alert("You can cancel an order only within 1 hour.");
      return;
    }
    if (order.status === "Accepted") {
      alert("Cannot cancel an accepted order.");
      return;
    }

    updateOrderStatus(order.id, "Canceled");
  };

  const handleEdit = (order: Order) => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const diffMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);

    if (user?.role === "customer" && diffMinutes > 60) {
      alert("You can edit an order only within 1 hour.");
      return;
    }
    if (order.status === "Accepted") {
      alert("Cannot edit an accepted order.");
      return;
    }
    navigate("/edit-order");
    updateOrderStatus(order.id, "Edited");
    alert(`Order #${order.id} edited successfully`);
  };

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

  const handleCreateOrder = () => {
    navigate("/create-order");
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
            <th>Product</th> {/* added column */}
            <th>Status</th>
            <th>Amount</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => {
              const now = new Date();
              const orderTime = new Date(order.createdAt);
              const diffMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);
              const canModify =
                user?.role !== "customer" ||
                (diffMinutes <= 60 &&
                  order.status !== "Canceled" &&
                  order.status !== "Accepted");

              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerEmail}</td>
                  <td>{order.productName}</td> {/* display product */}
                  <td className={getStatusClass(order.status)}>{order.status}</td>
                  <td>₹{order.amount}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEdit(order)} disabled={!canModify}>
                      Edit
                    </button>
                    <button onClick={() => handleCancel(order)} disabled={!canModify}>
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className={styles.noData}> {/* updated colspan */}
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
