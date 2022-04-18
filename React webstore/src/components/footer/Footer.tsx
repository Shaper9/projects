import React from 'react';
import classes from "./Footer.module.scss"
import facebookIcon from '../../img/footerimgs/icon-facebook.svg'
import ytIcon from '../../img/footerimgs/icon-youtube.svg'
import twitIcon from '../../img/footerimgs/icon-twitter.svg'
import pintIcon from '../../img/footerimgs/icon-pinterest.svg'
import instaIcon from '../../img/footerimgs/icon-instagram.svg'
import Button from '../helpers/Button';


const Footer: React.FC = () => {
    return (
        <div className={classes.footerWrapper}>
            <div className={classes.footerWall}>
                <div className={classes.socialMediaField}>
                    <img src={facebookIcon} alt="facebookicon" />
                    <img src={ytIcon} alt="ytIcon" />
                    <img src={twitIcon} alt="twitIcon" />
                    <img src={pintIcon} alt="pintIcon" />
                    <img src={instaIcon} alt="instaIcon" />
                </div>
                <div className={classes.linkField}>
                    <div className={classes.row}>
                        <span>About Us</span>
                        <span>Contact</span>
                        <span>Blog</span>
                    </div>
                    <div className={classes.row}>
                        <span>Careers</span>
                        <span>Support</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
                <div className={classes.buttonField}>
                    <Button onClick={() => console.log('none')} className={classes.button}>Request Invite</Button>
                    <span>©All Rights Reserved</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;