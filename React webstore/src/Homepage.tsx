import React from 'react';
import Navbar from './components/homepage/navbar/Navbar';
import ItemsContainer from './components/homepage/itemsContainer/ItemsContainer';
import HeroSection from './components/homepage/heroSection/HeroSection';
import WhyUsSection from './components/homepage/whyUs/WhyUsSection';
import Footer from './components/homepage/footer/Footer';


const Homepage: React.FC = () => {

    return (
        <>
            <Navbar />

            <HeroSection />

            <ItemsContainer />

            <WhyUsSection />

            <Footer /></>
    )
}


export default Homepage