import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage/CartPage";
import ProductsListPage from "./pages/ProductsListPage/ProductsListPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
