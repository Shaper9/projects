import React from 'react';
import classes from './Button.module.scss'


type Props = { children: React.ReactNode, className: string, ref: HTMLAllCollection, onClick: (e: React.MouseEvent) => void }

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
    return (
        <button className={`${classes.button} ${props.className}`} onClick={props.onClick} ref={ref}>
            {props.children}
        </button>
    )
})

export default Button;