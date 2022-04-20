import React from 'react';
import classes from './Navbar.module.scss'
import logoImg from "../../../img/logo.svg"
import cartIcon from "../../../img/cartIcon.png"
import Button from '../../helpers/Button';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { NavLink, Link } from 'react-router-dom';


const Navbar: React.FC = () => {

    // Observer
    // @ts-ignore
    const { ref, inView } = useInView({
        threshold: 0
    })

    const nOfItemsInCart = useSelector((state: any) => state.cart.numberOfItemsInCart)

    const clickHandler = () => {
        console.log("cart log");
    }


    return (
        <nav className={classes.navWrapper}>
            <div className={classes.navbarWall}>
                <div className={classes.imgWrapper}>
                    <NavLink to='/'><img src={logoImg} alt="logo" /></NavLink>
                </div>
                <div className={classes.navMenuWrapper}>
                    <NavLink className={(navData) => (navData.isActive ? classes.active : classes.navMenuLink)} to="/about">
                        <div className={classes.navMenuLink}>About</div>
                    </NavLink>
                    <a href="#" className={classes.navMenuLink}>Contact</a>
                    <a href="#" className={classes.navMenuLink}>Blog</a>
                    <a href="#" className={classes.navMenuLink}>Careers</a>
                </div>
                <div className={classes.navCartWrapper}>
                    <Link to='/yourcart'>
                        <Button className={classes.navCartButton} ref={ref} onClick={clickHandler} >
                            <span>CART</span> <img src={cartIcon} alt="cart" className={classes.cartImg} />
                            <div className={classes.nOfItemsInCart}>{nOfItemsInCart}</div>
                        </Button>
                    </Link>
                </div>
            </div>
            <Link to='/yourcart'>
                {!inView && <div className={classes.absoluteCart} >
                    <img src={cartIcon} alt="" />
                    <p>{nOfItemsInCart}</p>
                </div>}
            </Link>
        </nav>
    )
}



export default Navbar;