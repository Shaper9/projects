import React from 'react';
import classes from './App.module.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
// import AboutPage from './components/aboutpage/AboutPage';
const AboutPage = React.lazy(() => import("./components/aboutpage/AboutPage"));
// import Homepage from './Homepage';
const Homepage = React.lazy(() => import("./Homepage"))




const App: React.FC = () => {
  return (
    <main className={classes.pageWrapper}>

      <BrowserRouter>
        <Routes>
          {/* HOMEPAGE ROUTE */}
          <Route path='/' element={
            <React.Suspense fallback={<div className={classes.fullPageLoader}><MoonLoader /></div>}>
              <Homepage />
            </React.Suspense>}>

          </Route>

          {/* ABOUTPAGE ROUTE */}
          <Route path='/about' element={
            <React.Suspense fallback={<div className={classes.fullPageLoader}><MoonLoader /></div>}>
              <AboutPage />
            </React.Suspense>}
          />

        </Routes>
      </BrowserRouter>

    </main>
  );
}

export default App;
