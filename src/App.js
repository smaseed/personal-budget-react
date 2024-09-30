import React from 'react';
import './App.scss';
import {
  Route,
  Routes
} from 'react-router-dom';


import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';


function App() {
  return (
    <div className="App">
      <Menu/>
      <Hero/>
      <div className='mainContainer'>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/about' element={<AboutPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
          </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
