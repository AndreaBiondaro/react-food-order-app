import Meal from './Meal';

type AvailableMealAction =
    { type: 'SET_MEALS', payload: Array<Partial<Meal>> } |
    { type: 'ADD_MEAL', payload: Partial<Meal> } |
    { type: 'REMOVE_MEAL', payload: string };

export default AvailableMealAction;