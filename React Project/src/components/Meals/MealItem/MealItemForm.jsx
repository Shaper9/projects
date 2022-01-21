import React, { useRef, useState } from 'react';
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';

const MealItemForm = (props) => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();
        const etneredAmount = amountInputRef.current.value;  /* ovaj value je UVEK ALI UVEK STRING, makar mi upisali int */
        const enteredAmountNumber = +etneredAmount;

        if (etneredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return
        }

        props.onAddToCart(enteredAmountNumber)
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" ref={amountInputRef} input={{   /* u prop mozemo da prosledimo i objekat ovako (u ovom slucaju sve ovo ce biti prosledjeno i mocicemo da koristimo svaki od ovih parova)  */
                id: 'amount' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>Add</button>
            {!amountIsValid && <p>please entere valid input</p>}
        </form>
    )
}

export default MealItemForm;