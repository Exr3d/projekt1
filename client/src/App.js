import "./App.css";
import React from 'react'
import {useState} from "react";
import Axios from "axios"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Informacje from "./Informacje"
import Zarejestruj from "./Zarejestruj"
import Home from "./Home"
import Zaloguj from "./zaloguj"


function App() {
  
  return (
    
    <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/lista" element={<Informacje />}/>
          <Route path="/zarejestruj" element={<Zarejestruj />}/>
          <Route path="/zaloguj" element={<Zaloguj />}/>
        </Routes>
    </Router>
    
  );
}

export default App;
