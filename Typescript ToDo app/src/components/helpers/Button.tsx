import React from 'react';
// @ts-ignore
import classes from './Button.module.scss'

type Props = { children: React.ReactNode, className: string, ref: HTMLAllCollection, onMouseEnter: (e: React.MouseEvent) => void, onMouseLeave: (e: React.MouseEvent) => void, handleClick: (e: React.MouseEvent) => void }

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
    return (
        <button className={`${classes.submitButton}     ${props.className}`} onClick={props.handleClick} ref={ref} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>{props.children}</button>
    )
})

export default Button