import React, { useRef, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/cart-provider";

const App = () => {
  // const ammountInputRef = useRef();

  const [cart, setCart] = useState();

  const modalHandler = () => {
    setCart((cart) => !cart);
  };

  // function for onClick Cart
  // const submitHandler = (event) => {
  //   event.preventDefault();

  //   // setEnteredTitle("");
  //   // setAge("");
  //   ammountInputRef.current.value = "";
  // };

  return (
    <CartProvider>
      {cart && <Cart onClick={modalHandler} />}

      <Header onClick={modalHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
