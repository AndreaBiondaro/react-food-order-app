import Meal from './Meal';

type CartContext = {
    items: Array<Meal>;
    totalAmount: number;
    addItem: (item: Meal) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export default CartContext;