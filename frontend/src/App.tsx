import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StocksList from "./components/StocksList";
import StockDetails from "./components/StockDetails";
import "./App.css";
import Home from "./pages/home/Home.tsx";


function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/stocks" element={<StocksList />} />
            <Route path="/stocks/:ID" element={<StockDetails />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
