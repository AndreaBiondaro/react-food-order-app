import { FunctionComponent, useReducer } from "react";

import CartContext from "./cart-context";

import { default as CartContextModel } from '../models/CartContext';
import { default as CartStateModel } from '../models/CartState';
import CartAction from '../models/CartActions';
import Meal from '../models/Meal';

type CartReducer = React.Reducer<CartStateModel, CartAction>;

const defaultCartState: CartStateModel = {
    items: [],
    totalAmount: 0
};

const cartReducer: CartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItem;
        let updatedItems;

        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = [
                ...state.items,
                action.payload
            ]
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload);

        const existingItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.payload);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    return defaultCartState;
}

const CartProvider: FunctionComponent = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer<CartReducer, CartStateModel>(cartReducer, defaultCartState, x => x);


    const cartContext: CartContextModel = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: (item: Meal) => {
            dispatchCartAction({ type: 'ADD', payload: item });
        },
        removeItem: (item: string) => {
            dispatchCartAction({ type: 'REMOVE', payload: item });
        }
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;