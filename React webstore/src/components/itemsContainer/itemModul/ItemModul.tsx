import React from 'react'
import classes from "./ItemModul.module.scss"
import Backdrop from './Backdrop'


const ItemModul = () => {
    return (
        <React.Fragment>
            <Backdrop />
            <div className={classes.itemCard}>
                test
            </div>
        </React.Fragment>

    )
}


export default ItemModul