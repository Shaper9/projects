import React from 'react';
import classes from './Input.module.css'

const Input = (props) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id} >{props.label}</label>
            <input type="text" id={props.input.id} {...props.input} />
            {/* sa ...props.input svaki key value pair ce biti dodat kao atribut npr objekat {text:"yes", id:1222} znaci da ce biti dodat text="yes" id=1222
            id nam ovde i ne treba, ali cu ostaviti zbog preglednosti */}
        </div>
    )

}

export default Input;