import { Fragment, useContext, useState } from 'react';

import classes from './Cart.module.css';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import Checkout from './Checkout';

import CartContext from '../../store/cart-context';

import Meal from '../../models/Meal';
import UserData from '../../models/UserData';

type CartProps = {
    onClose: () => void;
};

const Cart = ({ onClose }: CartProps) => {
    const cartCtx = useContext(CartContext);

    const [isCheckingout, setIsCheckingout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSumit, setDidSubmit] = useState(false);
    const [isInError, setIsInError] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id: string) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item: Meal) => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    };

    const orderHandler = () => {
        setIsCheckingout(true);
    }

    const onCancelCheckoutHandler = () => {
        setIsCheckingout(false);
    }

    const submitOrderHandler = async (userData: UserData) => {
        setIsSubmitting(true);
        const response = await fetch('http://localhost:3002/api/data', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({
                userData,
                cartItems: cartCtx.items
            })
        })

        response.json().then(_ => {
            cartCtx.clearCart();
        }).catch(error => {
            console.error(error);
            setIsInError(true);
        }).finally(() => {
            setDidSubmit(true);
            setIsSubmitting(false);
        });
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {
                cartCtx.items.map(item => <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    // bind allows us to input values without executing the function immediately. 
                    // In fact, with bind a new function is returned.
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)} />
                )
            }
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckingout && <Checkout onCancel={onCancelCheckoutHandler} onConfirm={submitOrderHandler} />}
            {!isCheckingout && modalActions}
        </Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <Fragment>
            {!isInError && <p>Successfully sent the order!</p>}
            {isInError && <p>Error while trying to submit the order.!</p>}
            <div className={classes.actions}>
                <button className={classes.button} onClick={onClose}>Close</button>
            </div>
        </Fragment>
    );

    return (
        <Modal onClose={onClose}>
            {!isSubmitting && !didSumit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSumit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;