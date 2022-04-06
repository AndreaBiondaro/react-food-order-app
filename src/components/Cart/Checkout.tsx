import { useState, useEffect } from 'react';

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
    const [nameValue, setNameValue] = useState('');
    const [streetValue, setStreetValue] = useState('');
    const [cityValue, setCityValue] = useState('');
    const [postalCodeValue, setPostalCodeValue] = useState('');

    // These additional states are needed because if the user hasn't touched the input field yet we can't show the error message.
    const [nameIsTouched, setNameIsTouched] = useState(false);
    const [streetIsTouched, setStreetIsTouched] = useState(false);
    const [cityIsTouched, setCityIsTouched] = useState(false);
    const [postalCodeIsTouched, setPostalCodeIsTouched] = useState(false);

    const isNameValid = !isEmpty(nameValue);
    const isStreetValid = !isEmpty(streetValue);
    const isCityValid = !isEmpty(cityValue);
    const isPostalCodeValid = isFiveChars(postalCodeValue);

    let formIsvalid = false;
    if (isNameValid && isStreetValid && isCityValid && isPostalCodeValid) {
        formIsvalid = true;
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNameValue(value);
    };

    const onStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setStreetValue(value);
    };

    const onCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCityValue(value);
    };

    const onPostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPostalCodeValue(value);
    };

    const onNameBlur = () => {
        setNameIsTouched(true);
    };

    const onStreetBlur = () => {
        setStreetIsTouched(true);
    };

    const onCityBlur = () => {
        setCityIsTouched(true);
    };

    const onPostalCodeBlur = () => {
        setPostalCodeIsTouched(true);
    };


    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const nameIsValid = !isEmpty(nameValue);
        const streetIsValid = !isEmpty(streetValue);
        const postalCodeIsValid = isFiveChars(postalCodeValue);
        const cityIsValid = !isEmpty(cityValue);

        const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

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

    const nameInputIsInvalid = !isNameValid && nameIsTouched;
    const streetInputIsInvalid = !isStreetValid && streetIsTouched;
    const cityInputIsInvalid = !isCityValid && cityIsTouched;
    const postalCodeInputIsInvalid = !isPostalCodeValid && postalCodeIsTouched;

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={`${getFormControlStyle(!nameInputIsInvalid)}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' onChange={onNameChange} onBlur={onNameBlur} />
                {nameInputIsInvalid && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${getFormControlStyle(!streetInputIsInvalid)}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' onChange={onStreetChange} onBlur={onStreetBlur} />
                {streetInputIsInvalid && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${getFormControlStyle(!postalCodeInputIsInvalid)}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' onChange={onPostalCodeChange} onBlur={onPostalCodeBlur} />
                {postalCodeInputIsInvalid && <p>Please enter a valid postal code (5 characters long)!</p>}
            </div>
            <div className={`${getFormControlStyle(!cityInputIsInvalid)}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' onChange={onCityChange} onBlur={onCityBlur} />
                {cityInputIsInvalid && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button className={classes.submit} disabled={!formIsvalid}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;