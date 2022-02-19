import React, { useRef } from 'react';
import classes from './Button.module.scss'


const Button = React.forwardRef((props, ref) => {
    return (
        <button className={`${classes.submitButton}     ${props.className}`} onClick={props.handleClick} ref={ref} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>{props.children}</button>
    )
})

export default Button