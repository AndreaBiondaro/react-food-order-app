import Meal from './Meal';

type CartContext = {
    items: Array<Meal>;
    totalAmount: number;
    addItem: (item: Meal) => void;
    removeItem: (id: string) => void;
}

export default CartContext;