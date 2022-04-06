import { createSlice } from '@reduxjs/toolkit';

import Meal from '../models/Meal';
import AvaiableMealState from '../models/AvailableMealState';
import AvailableMealAction from '../models/AvailableMealAction';


createSlice<AvaiableMealState, any, string>({
    name: 'available-meal',
    initialState: {
        meals: []
    },
    reducers: {
        setMeals: (state: AvaiableMealState, action: AvailableMealAction) => {
            // state.meals = action.payload;
        },
        addMeal: (state: AvaiableMealState, action: AvailableMealAction) => { },
        removeMeal: (state: AvaiableMealState, action: AvailableMealAction) => { }
    }
});