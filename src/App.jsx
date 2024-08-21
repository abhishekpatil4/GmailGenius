import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return <>
    <Navbar />
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer />
  </>
}

export default App;