import React, { useContext, useRef } from "react";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";
import CartContext from "../../store/cart-context";

const MealItemForm = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();

    const mealID = event.target.form[0].attributes[0].value;
    const amount = event.target.form[0].value;
    const mealData = {
      id: mealID,
      amount: +amount,
    };
    props.addItem(mealData);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        key={Math.random()}
        label="Amount"
        input={{
          id: "amount_" + props.id, // this changed!
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
    </form>
  );
};

export default MealItemForm;
