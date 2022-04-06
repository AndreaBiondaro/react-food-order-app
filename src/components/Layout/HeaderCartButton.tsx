import { useContext } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

type HeaderCartButtonProps = {
    onClick: () => void;
}

const HeaderCartButton = ({ onClick }: HeaderCartButtonProps) => {
    const cartCtx = useContext(CartContext);

    const numberOfItems = cartCtx.items.reduce((acc, item) => acc + (item.amount || 0), 0);


    const btnClass = `${classes.button} ${classes.bump}`

    return (
        <button className={btnClass} onClick={onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>You Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    );
};

export default HeaderCartButton;