import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Single from "./pages/Single/Single";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/git-browser" element={<Home />} />
          <Route path="/git-browser/search/:username" element={<List />} />
          <Route path="/git-browser/user/:id" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
