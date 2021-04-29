import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  // set state for modal
  const cartCtx = useContext(CartContext);
  // family.filter(person => person.age > 18);
  const cartItems = cartCtx.items
    .filter((item) => item.qty > 0)
    .map((item) => {
      return (
        <CartItem
          name={item.name}
          price={item.price}
          amount={item.qty}
          id={item.id}
        />
      );
    });

  return (
    <>
      <Modal onClick={props.onClick}>
        <ul className={classes["cart-items"]}>{cartItems}</ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>36.62</span>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onClick} className={classes["button--alt"]}>
            Close
          </button>
          <button className={classes.button}>Order</button>
        </div>
      </Modal>
    </>
  );
};
export default Cart;
