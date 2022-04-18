import React from 'react';
// @ts-ignore
import classes from './App.module.scss';

import Navbar from './components/navbar/Navbar';
import ItemsContainer from './components/itemsContainer/ItemsContainer';
import HeroSection from './components/heroSection/HeroSection';
import WhyUsSection from './components/whyUs/WhyUsSection';
import Footer from './components/footer/Footer';




const App: React.FC = () => {
  return (
    <main className={classes.pageWrapper}>

      <Navbar />

      <HeroSection />


      <ItemsContainer />

      <WhyUsSection />

      <Footer />

    </main>
  );
}

export default App;
