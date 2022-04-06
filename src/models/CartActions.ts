import Meal from './Meal';

type CartAction =
    { type: 'ADD', payload: Meal } |
    { type: 'REMOVE', payload: string } |
    { type: 'CLEAR' };


export default CartAction;