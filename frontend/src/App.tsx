import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StocksList from "./components/StocksList";
import "./App.css";
import Home from "./pages/home/Home.tsx";
import StockDetailsWithItems from "./components/StockDetailsWithItems.tsx";


function App() {
    return (
        <Router>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/home"/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/stocks" element={<StocksList/>}/>
                    <Route path="/stocks/:ID" element={<StockDetailsWithItems/>}/>
                    {/*<Route path="/stocks/:ID" element={<StockDetails />} />*/}
                    {/*<Route path="/stocks/:ID/items" element={<StockItems />} />*/}
                </Routes>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
