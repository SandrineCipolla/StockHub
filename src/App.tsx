// import { useState } from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import StockCreation from "./pages/home/StockCreation";

function App() {
  return (
    <>
      <Header />
      <main>
        <StockCreation />
      </main>
      <Footer />
    </>
  );
}

export default App;
