import React, { InputHTMLAttributes } from 'react';

import classes from './Input.module.css';

type InputProps = {
    label: string;
    input: InputHTMLAttributes<HTMLInputElement>;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, input }, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={input.id}>{label}</label>
            <input ref={ref} {...input} />
        </div>
    );
});

export default Input;