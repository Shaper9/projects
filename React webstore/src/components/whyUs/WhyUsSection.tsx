import React from "react"
import classes from './WhyUsSection.module.scss'
import onlineIcon from '../../img/icon-online.svg'
import budgetingIcon from '../../img/icon-budgeting.svg'
import fastAndEasyIcon from '../../img/icon-onboarding.svg'
import apiIcon from '../../img/icon-api.svg'


const WhyUsSection = () => {
    return (
        <div className={classes.whyUsSectionWrapper}>
            <div className={classes.whyUsSectionWall}>
                <div className={classes.headingText}>
                    <h2>Why chose Easybank?</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br /> Ad repellendus expedita fuga error ullam, nesciunt doloribus, esse explicabo sequi earum quas dolores! <br /> Nulla porro ad iusto cum iste consequuntur libero.</p>
                </div>
                <div className={classes.reasons}>
                    <div className={classes.onlineBanking}>
                        <div className={classes.imgWrapper}>
                            <img src={onlineIcon} alt="onlinebanking" />
                        </div>
                        <h2>Online Banking</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nam. Odio, doloremque ducimus aliquid perspiciatis veritatis iusto nihil repudiandae itaque veniam delectus tempora libero commodi similique! Aut, numquam culpa? Quos!</p>
                    </div>
                    <div className={classes.simpleBudgeting}>
                        <div className={classes.imgWrapper}>
                            <img src={budgetingIcon} alt="" />
                        </div>
                        <h2>Simple Budgeting</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eius recusandae, fugiat at veniam officiis voluptas necessitatibus voluptates, maxime labore voluptate aliquid eum magnam architecto?</p>
                    </div>
                    <div className={classes.fastAndEasy}>
                        <div className={classes.imgWrapper}>
                            <img src={fastAndEasyIcon} alt="" />
                        </div>
                        <h2>Fast and Easy</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus officia tempore unde rerum doloremque exercitationem placeat tenetur nesciunt deserunt sint. Tempore nisi quae nesciunt rerum praesentium tempora blanditiis iusto voluptatem!</p>

                    </div>
                    <div className={classes.openApi}>
                        <div className={classes.imgWrapper}>
                            <img src={apiIcon} alt="" />
                        </div>
                        <h2>Open API</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, facilis repudiandae, nulla magni cum omnis dolores quis laudantium iure aliquid magnam ex libero modi possimus id?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default WhyUsSection;