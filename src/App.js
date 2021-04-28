import React, { useRef, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

const App = () => {
  const ammountInputRef = useRef();

  const [cart, setCart] = useState();

  const modalHandler = () => {
    setCart((cart) => !cart);
  };

  // function for onClick Cart
  const submitHandler = (event) => {
    event.preventDefault();

    // setEnteredTitle("");
    // setAge("");
    ammountInputRef.current.value = "";
  };

  return (
    <>
      {cart && <Cart onClick={modalHandler} />}

      <Header onClick={modalHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
