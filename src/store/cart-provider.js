import React, { useReducer } from "react";
import CartContext from "./cart-context";
// this component managers the context from Cart Context
// const availableItems = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//     qty: 0,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//     qty: 0,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//     qty: 0,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//     qty: 0,
//   },
// ];

// const charFinder = (str) => {
//   return -1 + +str.charAt(str.length - 1);
// };
// default state to compace reducer to
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// kicks off reducer state change
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // recieves current state snapshot as state
    const updatedItem = state.items.concat(action.item);
    // find existing items.
    const existingCartItemsIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemsIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemsIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + +action.item.price * +action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      amount: updatedTotalAmount,
    };
  }
  // REMOVE
  if (action.type === "REMOVE") {
    // find the index of item with id
    const existingCartItemsIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    // get the array and x 1 off that amount
    // make a copy of old state
    //
    const existingCartItem = state.items[existingCartItemsIndex];
    // copy state and change amount
    let updatedItems;

    let itemPrice = state.items[existingCartItemsIndex].price;
    if (existingCartItem.amount === 1) {
      // filter gives a new array where item id does not equ
      // the id from the action state
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      // make a copy of old state
      updatedItems = [...state.items];
      // update the item at the index with changed state
      updatedItems[existingCartItemsIndex] = updatedItem;
    }
    const updatedTotalAmount = state.totalAmount - +itemPrice * 1;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      amount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

/// MAIN FUNCTION
const CartProvider = (props) => {
  //  cartReducer = fucntion that kicks off reducer state change
  //  defaultCartState inital state used to compare state
  //  cartState = state snapshot called from the the context provider below
  //  dispatchCartAction = dispatch action of the Ruducer

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // const totalAmount = () => {
  //   const total = cartContext.items
  //     .map((item) => item.qty * item.price)
  //     .reduce((partial_sum, a) => partial_sum + a, 0);

  //   cartContext.totalAmount = total;
  // };

  const addItemToCartHandler = (item) => {
    // MY CODE
    // event.preventDefault();
    // fruits.push(fruits[0]);
    // cartContext.items[charFinder(item.id)].qty += item.amount;
    // totalAmount();

    // MAX CODE
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    console.log(id);
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  // links the Conext to the useReducer Hook
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.amount,
    amount: cartState.amount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  // Cart Context Provider is the wrapper for the app children //
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
