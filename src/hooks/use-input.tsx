import { useState } from 'react';

const useInput = (validateFunction: (value: string) => boolean) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateFunction(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    return {
        value: enteredValue,
        valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler
    }
};

export default useInput;