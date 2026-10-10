import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useAuth } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Order {
  id: number;
  customerEmail: string;
  productName: string;
  status: "Pending" | "Accepted" | "Canceled" | "Edited";
  amount: number;
  createdAt: string;
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<"All" | Order["status"]>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

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
        filteredOrders = storedOrders;
        break;
      case "customer":
        filteredOrders = storedOrders.filter((o) => o.customerEmail === user.email);
        break;
      default:
        filteredOrders = [];
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filteredOrders = filteredOrders.filter((o) => o.status === statusFilter);
    }

    // Sort by newest first (copy first so we never mutate the source array)
    const sorted = [...filteredOrders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setOrders(sorted);
  };

  useEffect(() => {
    loadOrders();
  }, [user, statusFilter]);

  const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
    const storedOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = storedOrders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    loadOrders();
    toast.success(`Order ${orderId} ${newStatus.toLowerCase()} successfully!`);
  };

  const handleCancel = (order: Order) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const diffMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);

    if (user?.role === "customer" && diffMinutes > 60) {
      toast.error("You can cancel an order only within 1 hour.");
      return;
    }
    if (order.status === "Accepted") {
      toast.error("Cannot cancel an accepted order.");
      return;
    }

    updateOrderStatus(order.id, "Canceled");
  };

  const handleEdit = (order: Order) => {
    if (!window.confirm("Are you sure you want to edit this order?")) return;

    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const diffMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);

    if (user?.role === "customer" && diffMinutes > 60) {
      toast.error("You can edit an order only within 1 hour.");
      return;
    }
    if (order.status === "Accepted") {
      toast.error("Cannot edit an accepted order.");
      return;
    }

    updateOrderStatus(order.id, "Edited");
    navigate(`/edit-order/${order.id}`);
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

  // Pagination
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h2 className={styles.title}>Orders</h2>

      {/* Filter + Create button in one row */}
      <div className={styles.toolbar}>
        <div className={styles.filterBar}>
          <label htmlFor="statusFilter">Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "All" | Order["status"]);
              setCurrentPage(1); // go back to page 1 when the filter changes
            }}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Canceled">Canceled</option>
            <option value="Edited">Edited</option>
          </select>
        </div>

        {(user?.role === "customer" || user?.role === "admin") && (
          <button className={styles.addButton} onClick={handleCreateOrder}>
            + Create Order
          </button>
        )}
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => {
                const now = new Date();
                const orderTime = new Date(order.createdAt);
                const diffMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);
                const canModify =
                  user?.role !== "customer" ||
                  (diffMinutes <= 60 &&
                    order.status !== "Canceled" &&
                    order.status !== "Accepted");

                return (
                  <tr
                    key={order.id}
                    className={styles.rowClickable}
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("button")) return;
                      navigate(`/view-order/${order.id}`);
                    }}
                  >
                    <td data-label="ID">{order.id}</td>
                    <td data-label="Customer">{order.customerEmail}</td>
                    <td data-label="Product">{order.productName}</td>
                    <td data-label="Status">
                      <span className={`${styles.badge} ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td data-label="Amount">₹{order.amount}</td>
                    <td data-label="Created">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(order)}
                        disabled={!canModify}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => handleCancel(order)}
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
                <td colSpan={7} className={styles.noData}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;