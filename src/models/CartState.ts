import Meal from './Meal';

type CartState = {
    items: Array<Meal>;
    totalAmount: number;
}

export default CartState;