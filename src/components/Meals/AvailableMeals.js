import React, { useContext, useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import CartContext from "../../store/cart-context";
import useHttp from "../../hooks/use-http";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];
const AvailableMeals = (props) => {
  // const cartAdditionHandler = (cartItem) => {
  //   cartCtx.addItem(cartItem);
  // };

  // const mealsList = DUMMY_MEALS.map((meal, index) => {
  //   return (
  //     <>
  //       <MealItem
  //         id={meal.id} // this is new!
  //         name={meal.name}
  //         description={meal.description}
  //         price={meal.price}
  //         key={meal.id}
  //         addItem={cartAdditionHandler}
  //       />
  //     </>
  //   );
  // });

  // set state
  const [meals, setMeals] = useState([]);

  // fetch meals from firebase
  const httpData = useHttp();

  const { isLoading, error, sendRequest: fetchMeals } = httpData;

  useEffect(() => {
    const loadMeals = (taskObj) => {
      const loadedTasks = [];

      taskObj.map((meal) => loadedTasks.push(meal));
      // for (const taskKey in taskObj) {
      //   loadedTasks.push({ id: taskKey, description: taskObj[taskKey].text });
      // }
      setMeals(loadedTasks);
    };
    fetchMeals(
      {
        url:
          "https://react-db-api-default-rtdb.asia-southeast1.firebasedatabase.app/menuItems.json",
      },
      loadMeals
    );
  }, [fetchMeals]);

  if (error) {
    return (
      <Card key={1} className={classes.meals}>
        <h2 className={classes.meals}>That's a Fail</h2>
      </Card>
    );
  }

  return (
    <Card key={1} className={classes.meals}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {meals.map((meal, index) => {
            return (
              <MealItem
                id={meal.id} // this is new!
                name={meal.name}
                description={meal.description}
                price={meal.price}
                loading={isLoading}
                error={error}
                key={index.toString()}
              />
            );
          })}
        </ul>
      )}
    </Card>
  );
};

export default AvailableMeals;
