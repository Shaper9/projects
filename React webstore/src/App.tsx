import React from 'react';
// @ts-ignore
import classes from './App.module.scss';

import Navbar from './components/navbar/Navbar';
import ItemsContainer from './components/itemsContainer/ItemsContainer';
import HeroSection from './components/heroSection/HeroSection';


function App() {
  return (
    <main className={classes.pageWrapper}>

      <Navbar />

      <HeroSection />

      <ItemsContainer />

    </main>
  );
}

export default App;
