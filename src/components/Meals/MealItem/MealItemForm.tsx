import { useRef, useState } from 'react';

import classes from './MealItemForm.module.css';

import Input from '../../UI/Input';

type MealItemFormProps = {
    id: string;
    onAddToCart: (amount: number) => void;
}

const MealItemForm = ({ id, onAddToCart }: MealItemFormProps) => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    const inputRef = useRef<HTMLInputElement | null>(null);


    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const enteredAmount = +(inputRef.current?.value || 0);

        if (enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }

        onAddToCart(enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label='Amount' input={{
                id: `amount_${id}`,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} ref={inputRef} />
            <button type="submit">+ Add</button>
            {!amountIsValid && <p>Please enter a valid number (1-5).</p>}
        </form>
    );
};

export default MealItemForm;