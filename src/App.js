import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/Pages/HomePage";
import Contacts from "./components/Pages/Contacts";
import About from "./components/Pages/About";
import Catalog from "./components/Main/Catalog/Catalog";
import CardItem from "./components/Main/Catalog/CardItem";
import CartBlock from "./components/Main/Cart/CartBlock";
import NotFound from "./components/Pages/NotFound";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about.html" element={<About />} />
          <Route path="contacts.html" element={<Contacts />} />
          <Route path="catalog.html" element={<Catalog />} />
          <Route path="catalog/:id.html" element={<CardItem/>}/>
          <Route path="cart.html" element={<CartBlock/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
