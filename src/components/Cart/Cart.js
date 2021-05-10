import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "../Checkout/Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const httpData = useHttp();
  const cartCtx = useContext(CartContext);
  const [orderForm, setOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
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

  // new order handler
  const createNewOrderHandler = (orderData) => {
    const userDeets = orderData;
    // get cart items
    const cartItems = cartCtx.items;
    const orderObject = {
      total: cartCtx.totalAmount,
      items: cartItems,
      userInfo: userDeets,
    };

    return orderObject;
  };

  // submit order
  // setup hook
  const { isLoading, error, sendRequest: sendCart } = httpData;
  const submittOrderHandler = (orderData) => {
    // get user order object
    setIsSubmitting(true);
    const orderData1 = createNewOrderHandler(orderData);

    // send info to firebase
    sendCart({
      url:
        "https://react-db-api-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: orderData1, // don't stringify
    });
    setIsSubmitting(false);
    setCartSuccess(true);
    // call the provider and nuke items
    cartCtx.clearCart();
  };

  const isSubmittingModalContent = <h3> Sending Order Data </h3>;
  const cartSuccessText = (
    <>
      <h3> Order Placed !!! </h3>
      <div className={classes.actions}>
        <button onClick={props.onClick} className={classes["button"]}>
          Close
        </button>
      </div>
    </>
  );

  const formContent = (
    <Checkout onOrder={submittOrderHandler} onCancel={formlHandler} />
  );
  // submit logic
  const cartModalContent = (
    <>
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
    </>
  );

  // console.log(cartCtx.totalAmount);
  return (
    <>
      <Modal onClick={props.onClick}>
        {!isLoading && !cartSuccess && cartModalContent}
        {isLoading && !cartSuccess && isSubmittingModalContent}
        {!isLoading && cartSuccess && cartSuccessText}
      </Modal>
    </>
  );
};

export default Cart;

//  const starWars = data2.results.map((movieData) => {
//    return {
//      id: movieData.episode_id,
//      title: movieData.title,
//      openingText: movieData.opening_crawl,
//      releaseDate: movieData.release_date,
//    };
//  });

//
//
//  // console.log(fetchMoviesHandler());
//  loadedMovies.reverse().push(...starWars);

//

//

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
