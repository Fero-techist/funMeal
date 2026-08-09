import { useContext, useEffect, useRef, useState } from "react";

import { currencyFormatter } from "../utils/formatting.jsx";
import Button from "./ui/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
    setAdded(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setAdded(false);
    }, 1300);
  }

  return (
    <li className="meal-item">
      <article>
        <img
          src={`https://funmeal-api.onrender.com/${meal.image}`}
          alt={meal.name}
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <div className="meal-item-actions">
          <Button
            type="button"
            onClick={handleAddMealToCart}
            className={`glovo-add${added ? " added" : ""}`}
          >
            <span>{added ? "✓ Added" : "Add to Cart"}</span>
          </Button>
          <span className={`added-notice${added ? " visible" : ""}`}>
            Added to cart!
          </span>
        </div>
      </article>
    </li>
  );
}
