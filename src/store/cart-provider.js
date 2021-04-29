import CartContext from "./cart-context";
// this component managers the context from Cart Context
const availableItems = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
    qty: 0,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
    qty: 0,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
    qty: 0,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
    qty: 0,
  },
];

const charFinder = (str) => {
  return -1 + +str.charAt(str.length - 1);
};

const idFinder = () => {};

const CartProvider = (props) => {
  const addItemToCartHandler = (item) => {
    // event.preventDefault();
    // fruits.push(fruits[0]);
    // console.log(item.amount);

    cartContext.items[charFinder(item.id)].qty = item.amount;
  };

  const removeItemFromCartHandler = (id) => {};
  const cartContext = {
    items: availableItems,
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  // Cart Context Provider is the wrapper for the app children //
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
