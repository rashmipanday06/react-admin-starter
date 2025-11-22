import { useEffect, useState } from "react";

// Cubic ease-out for smooth animation
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const useCountUp = (endValue: number | string, duration: number = 1200) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const finalValue =
      typeof endValue === "number"
        ? endValue
        : parseInt(endValue.replace(/₹/g, ""));

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.floor(easedProgress * finalValue));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [endValue, duration]);

  return count;
};

export default useCountUp;
