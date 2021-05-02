import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  // set state for modal
  const addToCartHandler = (amount) => {
    console.log(amount);
    cartCtx.addItem({
      id: amount.id,
      name: amount.name,
      amount: 1,
      price: amount.price,
    });
  };

  const removeFromCartHandler = (id) => {
    // console.log(id);
    cartCtx.removeItem(id);
  };
  // //{ "id": "amount_m1", "amount": 1
  // }
  // const cartItemHandler = (item) => {
  //   const mealID = item.target.id;
  //   const amount = item.target.value;
  //   const mealData = {
  //     id: mealID,
  //     amount: +amount,
  //   };
  //   // console.log(item.target.value);
  //   cartCtx.addItem(mealData);
  // };
  // family.filter(person => person.age > 18);
  const totalAmount =
    cartCtx.totalAmount > 0 ? cartCtx.totalAmount.toFixed(2) : 0;
  // const totalAmount = cartCtx.totalAmount || 0;
  const hasItems = cartCtx.items.length > 0;

  const cartItems = cartCtx.items
    .filter((item) => item.amount > 0)
    .map((item, index) => {
      return (
        <CartItem
          key={index.toString()}
          name={item.name}
          price={item.price}
          amount={item.amount}
          id={item.id}
          onRemove={removeFromCartHandler.bind(null, item.id)}
          onAdd={addToCartHandler.bind(null, item)}
          // itemHandler={cartItemHandler}
        />
      );
    });
  // console.log(cartCtx.totalAmount);
  return (
    <>
      <Modal onClick={props.onClick}>
        <ul className={classes["cart-items"]}>{cartItems}</ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>$ {totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onClick} className={classes["button--alt"]}>
            Close
          </button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
      </Modal>
    </>
  );
};
export default Cart;
