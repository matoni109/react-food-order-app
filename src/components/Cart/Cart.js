import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  // set state for modal
  const cartCtx = useContext(CartContext);
  // //{ "id": "amount_m1", "amount": 1
  // }
  const cartItemHandler = (item) => {
    const mealID = item.target.id;
    const amount = item.target.value;
    const mealData = {
      id: mealID,
      amount: +amount,
    };
    // console.log(item.target.value);
    cartCtx.addItem(mealData);
  };
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
          itemHandler={cartItemHandler}
        />
      );
    });

  return (
    <>
      <Modal onClick={props.onClick}>
        <ul className={classes["cart-items"]}>{cartItems}</ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{cartCtx.totalAmount}</span>
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
