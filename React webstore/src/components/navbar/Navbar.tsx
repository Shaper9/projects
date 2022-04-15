import React from 'react';
import classes from './Navbar.module.scss'
import logoImg from "../../img/logo.svg"
import cartIcon from "../../img/cartIcon.png"
import Button from '../helpers/Button';


const Navbar: React.FC = () => {

    const cartRef = React.createRef<HTMLButtonElement>()

    const clickHandler = () => {
        console.log("cart log");
    }


    return (
        <nav className={classes.navWrapper}>
            <div className={classes.navbarWall}>
                <div className={classes.imgWrapper}>
                    <img src={logoImg} alt="logo" />
                </div>
                <div className={classes.navMenuWrapper}>
                    <a href="#" className={classes.navMenuLink}>About</a>
                    <a href="#" className={classes.navMenuLink}>Contact</a>
                    <a href="#" className={classes.navMenuLink}>Blog</a>
                    <a href="#" className={classes.navMenuLink}>Careers</a>
                </div>
                <div className={classes.navCartWrapper}>
                    <Button className={classes.navCartButton} ref={cartRef} onClick={clickHandler} >
                        <span>CART</span> <img src={cartIcon} alt="cart" className={classes.cartImg} />
                    </Button>
                </div>
            </div>
        </nav>
    )
}



export default Navbar;