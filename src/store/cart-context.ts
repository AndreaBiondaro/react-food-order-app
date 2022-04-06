import React from 'react';

import { default as CartContextModel } from '../models/CartContext';

const defaultContext = {
    items: [],
    totalAmount: 0,
    addItem: () => { },
    removeItem: () => { }
};

const CartContext = React.createContext<CartContextModel>(defaultContext);

export default CartContext;