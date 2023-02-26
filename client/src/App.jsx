import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(state => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/login" element={user ? <Navigate to="/"/> :<Login/>}/>
        <Route exact path="/products/:category" element={<ProductList/>}/>
        <Route exact path="/product/:id" element={<Product/>}/>
        <Route exact path="/register" element={user ? <Navigate to="/"/> :<Register/>}/>
        <Route exact path="/success" element={<Success />}/>
      </Routes>
    </Router>
  );
};

export default App;