import React from 'react';
import classes from './Navbar.module.scss'
import logoImg from "../../img/logo.svg"
import cartIcon from "../../img/cartIcon.png"
import Button from '../helpers/Button';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';


const Navbar: React.FC = () => {

    // Observer
    // @ts-ignore
    const { ref, inView } = useInView({
        threshold: 0
    })


    // const cartRef = React.createRef<HTMLButtonElement>()
    const nOfItemsInCart = useSelector((state: any) => state.cart.numberOfItemsInCart)

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
                    <Button className={classes.navCartButton} ref={ref} onClick={clickHandler} >
                        <span>CART</span> <img src={cartIcon} alt="cart" className={classes.cartImg} />
                        <div className={classes.nOfItemsInCart}>{nOfItemsInCart}</div>
                    </Button>
                </div>
            </div>
            {!inView && <div className={classes.absoluteCart}>
                <img src={cartIcon} alt="" />
                <p>{nOfItemsInCart}</p>
            </div>}
        </nav>
    )
}



export default Navbar;