import Navbar from './components/Navbar';
import Input from './components/Input';
import About from './components/About';
import { Context } from './components/Context';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact';
function App() {
  const [dark,setDark]=useState(false);
  const [select,setSelect]=useState("home");
  return (
    <Context.Provider value={{dark,setDark,select,setSelect}}>
    <Router>
      <div className={`transition-all ${dark?"bg-gray-800 text-white":""} min-h-full overflow-hidden`}>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Input />} />
      <Route path="/index.html" element={<Input />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </div>
  </Router>
  </Context.Provider>
  );
}
export default App;
