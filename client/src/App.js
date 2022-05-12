import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Github from "./components/Github/Github";
import Data from "./components/Data/Data";
import Specific from "./components/Specific/Specific";
import Favorite from "./components/Favorite/Favorite";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Github />} />
          <Route path="/data/:id" element={<Data />} />
          <Route path="/specific/:login" element={<Specific />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
