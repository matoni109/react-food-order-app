import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
// import classNames from "classnames/bind";
// https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component
// let cx = classNames.bind(classes);

const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();

    if (
      !setEnteredNameIsValid ||
      !setEnteredStreetIsValid ||
      !setEnteredPostIsValid ||
      !setEnteredCityIsValid
    ) {
      return;
    }

    resetNameInput();
    resetStreetInput();
    resetPostInput();
    resetCityInput();
  };

  // inputs

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

  const {
    value: enteredStreet,
    isValid: setEnteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPost,
    isValid: setEnteredPostIsValid,
    hasError: postInputHasError,
    valueChangeHandler: postChangedHandler,
    inputBlurHandler: postBlurHandler,
    reset: resetPostInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: setEnteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  /// css bit
  const nameInputClasses = nameInputHasError ? classes["invalid"] : "";
  const streetInputClasses = streetInputHasError ? classes["invalid"] : "";
  const postInputClasses = postInputHasError ? classes["invalid"] : "";
  const cityInputClasses = cityInputHasError ? classes["invalid"] : "";
  // form valid

  let formIsValid = false;

  if (
    setEnteredNameIsValid &&
    setEnteredStreetIsValid &&
    setEnteredPostIsValid &&
    setEnteredCityIsValid
  ) {
    formIsValid = true;
    console.log(formIsValid);
  }

  // jsx
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
      <div className={classes.control + " " + streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangedHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
      </div>
      <div className={classes.control + " " + postInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postChangedHandler}
          onBlur={postBlurHandler}
          value={enteredPost}
        />
      </div>
      <div className={classes.control + " " + cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        {formIsValid && <button className={classes.submit}>Confirm</button>}
      </div>
    </form>
  );
};

export default Checkout;
