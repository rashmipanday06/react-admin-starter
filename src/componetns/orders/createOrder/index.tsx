import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

interface Product {
  name: string;
  price: number;
}

interface Order {
  id: number;
  productName: string;
  amount: number;
  status: "new" | "pending" | "accepted" | "completed" | "canceled";
  createdAt: string;
}

// Sample product list
const PRODUCTS: Product[] = [
  { name: "Product A", price: 100 },
  { name: "Product B", price: 250 },
  { name: "Product C", price: 500 },
];

export default function CreateOrder() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState(0);

  // Auto-fill amount based on product selection
  useEffect(() => {
    const product = PRODUCTS.find((p) => p.name === productName);
    setAmount(product ? product.price : 0);
  }, [productName]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!productName) return alert("Select a product");

    const newOrder: Order = {
      id: Date.now(),
      productName,
      amount,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    const storedOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    storedOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    navigate("/orders");
  };

  return (
    <div className={styles.container}>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit} className={styles.form}>

        {/* Product dropdown */}
        <div className={styles.formGroup}>
          <label>Product</label>
          <select value={productName} onChange={(e) => setProductName(e.target.value)} required>
            <option value="">Select Product</option>
            {PRODUCTS.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount (auto-filled) */}
        <div className={styles.formGroup}>
          <label>Amount (₹)</label>
          <input type="number" value={amount} disabled />
        </div>

        <button type="submit" className={styles.btn}>
          Place Order
        </button>
      </form>
    </div>
  );
}
