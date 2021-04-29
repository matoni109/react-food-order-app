import React, { useContext, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import Cart from "../Cart/Cart";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const cartItems = cartCtx.items
    .map((item) => item.qty)
    .reduce((partial_sum, a) => partial_sum + a, 0);

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
