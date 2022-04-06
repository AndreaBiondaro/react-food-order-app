import useInput from '../../hooks/use-input';

import classes from './Checkout.module.css';

import UserData from '../../models/UserData';

type CheckoutProps = {
    onCancel: () => void;
    onConfirm: (userData: UserData) => void;
}

const isNotEmpty = (value: string) => value.trim().length > 0;
const isFiveChars = (value: string) => value.trim().length === 5;

const getFormControlStyle = (isValid: boolean): string => {
    return `${classes.control} ${isValid ? '' : classes.invalid}`;
}

const Checkout = ({ onCancel, onConfirm }: CheckoutProps) => {
    const {
        value: nameValue,
        valueIsValid: isNameValid,
        hasError: inputNameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler
    } = useInput(isNotEmpty);

    const {
        value: streetValue,
        valueIsValid: isStreetValid,
        hasError: inputStreetHasError,
        valueChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler
    } = useInput(isNotEmpty);

    const {
        value: cityValue,
        valueIsValid: isCityValid,
        hasError: inputCityHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler
    } = useInput(isNotEmpty);

    const {
        value: postalCodeValue,
        valueIsValid: isPostalCodeValid,
        hasError: inputPostalCodeHasError,
        valueChangeHandler: postalCodeChangeHandler,
        inputBlurHandler: postalCodeBlurHandler
    } = useInput(isFiveChars);


    let formIsvalid = false;
    if (isNameValid && isStreetValid && isCityValid && isPostalCodeValid) {
        formIsvalid = true;
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (!formIsvalid) {
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
            <div className={`${getFormControlStyle(!inputNameHasError)}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' onChange={nameChangeHandler} onBlur={nameBlurHandler} />
                {inputNameHasError && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${getFormControlStyle(!inputStreetHasError)}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' onChange={streetChangeHandler} onBlur={streetBlurHandler} />
                {inputStreetHasError && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${getFormControlStyle(!inputPostalCodeHasError)}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' onChange={postalCodeChangeHandler} onBlur={cityBlurHandler} />
                {inputPostalCodeHasError && <p>Please enter a valid postal code (5 characters long)!</p>}
            </div>
            <div className={`${getFormControlStyle(!inputCityHasError)}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' onChange={cityChangeHandler} onBlur={postalCodeBlurHandler} />
                {inputCityHasError && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button className={classes.submit} disabled={!formIsvalid}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;