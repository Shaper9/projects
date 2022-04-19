import React from 'react';
import HeroSectionText from './heroSectionText/HeroSectionText';
import HeroImgs from './heroSectionImg/HeroImgs';
import classes from './HeroSection.module.scss'

const HeroSection: React.FC = () => {


    return (
        <div className={classes.heroSectionWrapper}>
            <div className={classes.heroSectionWall}>
                <HeroSectionText className={classes.heroSectionTextWrapper} />
                <HeroImgs className={classes.heroSectionImgsWrapper} />
            </div>
        </div>
    )
}

export default HeroSection;