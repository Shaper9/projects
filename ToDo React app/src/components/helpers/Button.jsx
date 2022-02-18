import React from 'react';
import classes from './Button.module.scss'


const Button = React.forwardRef((props, ref) => {
    return (
        <button className={`${classes['submit-button']} ${props.children}`} onClick={props.handleClick} ref={ref}>{props.children}</button>
    )
})

export default Button