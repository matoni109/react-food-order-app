import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "../Checkout/Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [orderForm, setOrderForm] = useState(false);
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

  const formlHandler = () => {
    setOrderForm((show) => !show);
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
  const hasItems = cartCtx.totalAmount > 1;

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

  const formContent = <Checkout onCancel={formlHandler} />;
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
          {hasItems && !orderForm && (
            <button onClick={formlHandler} className={classes.button}>
              Order
            </button>
          )}
        </div>
        {orderForm && hasItems && formContent}
      </Modal>
    </>
  );
};
export default Cart;
