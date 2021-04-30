import React, { useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";
import CartContext from "../../store/cart-context";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  // use refs to get the info not below ( update input element )
  const amountInputRef = useRef();
  // const submitHandler = (event) => {
  //   event.preventDefault();

  //   const mealID = event.target.form[0].attributes[0].value;
  //   const amount = event.target.form[0].value;
  //   console.log(event);
  //   const mealData = {
  //     id: mealID,
  //     amount: +amount,
  //   };
  //   props.addItem(mealData);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    // props.addItem(mealData);
    props.addItem(enteredAmountNumber);
  };
  //

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit" onClick={submitHandler}>
        + Add
      </button>
      {!amountIsValid && <p>Please entere a valid amount 1-5 </p>}
    </form>
  );
};

export default MealItemForm;
