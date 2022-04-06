import { FunctionComponent, useContext } from "react";

import MealItemForm from "./MealItemForm";

import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

type MealItemProps = {
    id: string;
    name: string;
    description: string;
    price: number;
};

const MealItem: FunctionComponent<MealItemProps> = ({ id, name, description, price }) => {
    const cartCtx = useContext(CartContext);


    const addToCartHandler = (enteredAmount: number) => {
        cartCtx.addItem({
            id,
            name,
            description,
            price,
            amount: enteredAmount
        })
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;