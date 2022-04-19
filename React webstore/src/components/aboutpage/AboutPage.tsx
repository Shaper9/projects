import React from 'react';
import classes from './AboutPage.module.scss'
import Navbar from '../homepage/navbar/Navbar';
import Footer from '../homepage/footer/Footer';
import signatureImg from '../../img/signature.png'


const AboutPage: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className={classes.aboutPageContent}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium maiores dolores esse deserunt ratione! Corrupti atque rerum natus consequatur mollitia doloremque minima totam? Maxime odit dicta odio? Ullam officia magnam minus ipsam fugiat debitis eveniet officiis esse, ipsum, culpa omnis animi odit assumenda suscipit at fuga placeat inventore quo voluptatibus accusamus necessitatibus consequatur modi? Nisi rem officia doloremque maxime! Nostrum omnis itaque maxime dolorem! Quos impedit laboriosam dolore, blanditiis laborum, deserunt voluptates facilis hic accusantium nostrum magnam debitis nisi voluptatum! Quisquam numquam ullam quae nam tenetur similique architecto dolorum omnis! Reprehenderit quos vitae incidunt voluptas debitis blanditiis? Itaque fugit consequuntur dicta pariatur omnis neque odio repellat incidunt nihil laboriosam possimus ratione totam saepe laudantium enim assumenda, et cupiditate blanditiis reprehenderit. Reiciendis fugit recusandae minus iusto corporis illum voluptates earum inventore! Voluptatibus ratione velit reiciendis, perferendis ab sunt hic. Nostrum non expedita pariatur. Explicabo modi reiciendis iste aspernatur, ratione dolorem officiis?
                <img src={signatureImg} alt="" />
            </div>
            <Footer />
        </>
    )
}

export default AboutPage