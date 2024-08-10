import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StocksList from "./components/StocksList";
import "./App.css";
import Home from "./pages/home/Home.tsx";
import StockDetailsWithItems from "./components/StockDetailsWithItems.tsx";
import ItemsList from "./components/ItemsList.tsx";
import ItemDetails from "./components/ItemDetails.tsx";


function App() {

    return (
        <Router>
            <div >
                <Header/>
                <main >
                    <Routes>
                        <Route path="/" element={<Navigate to="/home"/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/stocks" element={<StocksList/>}/>
                        <Route path="/items" element={<ItemsList/>}/>
                        <Route path="/stocks/:ID" element={<StockDetailsWithItems/>}/>
                        <Route path="/stocks/:ID/items/:ID" element={<ItemDetails/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
