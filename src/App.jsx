import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="App d-flex flex-column align-items-center">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/CaC-front-pokemon" element={<Home />} />
          <Route path="/CaC-front-pokemon/login" element={<Login />} />
          <Route path="/CaC-front-pokemon/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
