import React from 'react';
import classes from './HeroImgs.module.scss'
// import HeroBG from '../../../img/heroSectionBG.svg'
import HeroPhoneImg from '../../../../img/heroSectionPhones.png'

const HeroImgs: React.FC<{ className: string }> = (props) => {
    return (
        <div className={`${classes.heroSectionImgs} ${props.className}`}>
            <div className={classes.backgroundImg}></div>
            <img src={HeroPhoneImg} alt="HeroPhoneImg" className={classes.heroPhoneImg} />
        </div>
    )
}

export default HeroImgs