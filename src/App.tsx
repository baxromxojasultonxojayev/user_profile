import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import PrivateCabine from "./views/PrivateCabine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/private" element={<PrivateCabine />} />
        {/* <Route path="/products" element={<ProductsPage />} />
        <Route path="/private-cabine" element={<MenuList />} /> Example route */}
      </Routes>
    </Router>
  );
}

export default App;
