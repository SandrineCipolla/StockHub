import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StocksList from "./components/StocksList";
import "./App.css";


function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
        <Route path="/" element={<StocksList />} />
          
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
