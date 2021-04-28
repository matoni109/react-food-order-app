import React from "react";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onClick} />
      </header>
      <div className={classes["main-image"]}>
        <CloudinaryContext cloudName="dr2satryk">
          <Image
            cloudName="dr2satryk"
            publicId="meals_dy2ur7.jpg"
            alt="table full
              of food"
          >
            <Transformation effect="improve" quality="auto" crop="scale" />
          </Image>
        </CloudinaryContext>
      </div>
    </>
  );
};

export default Header;
