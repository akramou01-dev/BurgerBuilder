import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
const burger = (props) => {
  let  transformed_ingredients = Object.keys(props.ingredients).map((ingr) => {
    return [...Array(props.ingredients[ingr])].map((_, index) => {
      return <BurgerIngredient key={ingr + index} type={ingr} />;
    });
  })
  .reduce((arr,el)=> {
      return arr.concat(el) 
  },[]);
  if (transformed_ingredients.length===0){
    transformed_ingredients = <p>Please start adding ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformed_ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
