import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

import UserData from '../../models/UserData';

type CheckoutProps = {
    onCancel: () => void;
    onConfirm: (userData: UserData) => void;
}

const isEmpty = (value: string) => !value || value.trim().length === 0;
const isFiveChars = (value: string) => value.trim().length === 5;

const getFormControlStyle = (isValid: boolean): string => {
    return `${classes.control} ${isValid ? '' : classes.invalid}`;
}

const Checkout = ({ onCancel, onConfirm }: CheckoutProps) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const streetInputRef = useRef<HTMLInputElement>(null);
    const postalCodeInputRef = useRef<HTMLInputElement>(null);
    const cityInputRef = useRef<HTMLInputElement>(null);


    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const nameValue = nameInputRef.current!.value;
        const streetValue = streetInputRef.current!.value;
        const postalCodeValue = postalCodeInputRef.current!.value;
        const cityValue = cityInputRef.current!.value;

        const isNameValid = !isEmpty(nameValue);
        const isStreetValid = !isEmpty(streetValue);
        const isPostalCodeValid = isFiveChars(postalCodeValue);
        const isCityValid = !isEmpty(cityValue);

        setFormInputsValidity({
            name: isNameValid,
            street: isStreetValid,
            city: isCityValid,
            postalCode: isPostalCodeValid
        });

        const formIsValid = isNameValid && isStreetValid && isPostalCodeValid && isCityValid;

        if (!formIsValid) {
            return;
        }

        onConfirm({
            name: nameValue,
            street: streetValue,
            city: cityValue,
            postalCode: postalCodeValue
        });
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={`${getFormControlStyle(formInputsValidity.name)}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${getFormControlStyle(formInputsValidity.street)}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${getFormControlStyle(formInputsValidity.postalCode)}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code (5 characters long)!</p>}
            </div>
            <div className={`${getFormControlStyle(formInputsValidity.city)}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;