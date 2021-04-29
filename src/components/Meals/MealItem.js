import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <>
      <li className={classes.meal}>
        <div>
          <h3 className={classes}>{props.name}</h3>
          <p className={classes.description}>{props.description}</p>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm addItem={props.addItem} id={props.id} />
        </div>
      </li>
    </>
  );
};

export default MealItem;
