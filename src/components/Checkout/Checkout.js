import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
// import classNames from "classnames/bind";
// https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component
// let cx = classNames.bind(classes);

const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();

    if (!setEnteredNameIsValid) {
      return;
    }

    resetNameInput();
  };

  const {
    value: enteredName,
    isValid: setEnteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
    // passes the value as a function below...
    // mind bending hey..
    // yep
  } = useInput((value) => value.trim() !== "");

  /// css bit
  const nameInputClasses = nameInputHasError ? classes["invalid"] : "";

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control + " " + nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
