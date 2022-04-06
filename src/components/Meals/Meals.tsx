import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvaibleMeals from "./AvailableMeals";

const Meals = () => {
    return (
        <Fragment>
            <MealsSummary />
            <AvaibleMeals />
        </Fragment>
    )
};

export default Meals;