import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home.js";
import Coin from "./Components/Coin.js";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/coin/:id" element={<Coin />} exact />
      </Routes>
    </Router>
  );
}

export default App;
