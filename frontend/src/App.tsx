import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StocksList from "./components/StocksList";
import "./App.css";
import Home from "./pages/home/Home.tsx";
import StockDetailsWithItems from "./components/StockDetailsWithItems.tsx";
import ItemsList from "./components/ItemsList.tsx";


function App() {
    //const {ID} = useParams<{ ID: string }>();
    return (
        <Router>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/home"/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/stocks" element={<StocksList/>}/>
                    <Route path="/items" element={<ItemsList/>}/>
                    <Route path="/stocks/:ID" element={<StockDetailsWithItems/>}/>
                    //TODO: check the need/relevance of these routes
                    {/*<Route path="/stocks/:ID" element={<StockDetails />} />*/}
                    {/*<Route path="/stocks/:ID/items" element={<StockItems  ID={ID}/>} />*/}
                </Routes>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
