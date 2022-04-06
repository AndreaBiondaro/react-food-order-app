import Meal from './Meal';

type CartAction =
    { type: 'ADD', payload: Meal } |
    { type: 'REMOVE', payload: string };


export default CartAction;