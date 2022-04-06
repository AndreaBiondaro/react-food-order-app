import React, { useState, useReducer } from 'react';

import InputState from '../models/InputState';
import InputAction from '../models/InputAction';

const initialState: InputState = {
    value: '',
    isTouched: false
};

const inputStateReducer: React.Reducer<InputState, InputAction> = (state, action) => {
    if (action.type === 'INPUT') {
        return {
            ...state,
            value: action.payload
        };
    } else if (action.type === 'TOUCH') {
        return {
            ...state,
            isTouched: true
        };
    }

    return initialState;
}

const useInput = (validateFunction: (value: string) => boolean) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

    const valueIsValid = validateFunction(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'INPUT', payload: event.target.value });
    };

    const inputBlurHandler = () => {
        dispatch({ type: 'TOUCH' });
    };

    return {
        value: inputState.value,
        valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler
    }
};

export default useInput;