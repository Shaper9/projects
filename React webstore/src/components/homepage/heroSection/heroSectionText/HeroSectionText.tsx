import React from 'react';
import classes from "./HeroSectionText.module.scss"
import Button from '../../../helpers/Button';


const HeroSectionText: React.FC<{ className: string }> = (props) => {

    const clickHandler = () => {
        console.log('hero button log');

    }

    const btnRef = React.createRef<HTMLButtonElement>()


    return (
        <div className={`${classes.heroSectionText} ${props.className}`}>
            <h1 className={classes.heroH1}>Next generation web-store at your door step</h1>
            <p className={classes.heroPara}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus ratione et alias iste minus eius tenetur dicta ducimus non beatae at, hic quia sequi expedita atque ipsa doloribus accusantium pariatur deleniti? Quia totam modi quisquam corporis fugit quam tenetur?
            </p>

            <Button className={classes.heroButton} onClick={clickHandler} ref={btnRef}>Special Request</Button>

        </div>
    )

}

export default HeroSectionText;