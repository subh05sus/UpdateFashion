import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AdminPanel from "./pages/AdminPanel";
import AdminAddProduct from "./pages/AddProduct";
import AdminProductList from "./pages/AdminProductList";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminBannersPage from "./pages/AdminBannersPage";
import HomePage from "./pages/Homepage";
import SubCategoryPage from "./pages/SubCategoryPage";
import AllProductsPage from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage/></Layout>} />
        <Route path="/register" element={<Layout><Register/></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn/></Layout>} />

        <Route path="/sub-category/:subcategory" element={<Layout><SubCategoryPage/></Layout>} />
        <Route path="/all-products" element={<Layout><AllProductsPage/></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetails/></Layout>} />

        

        <Route path="/admin" element={<Layout><AdminPanel/></Layout>} />
        <Route path="/admin/add-product" element={<Layout><AdminAddProduct/></Layout>} />
        <Route path="/admin/edit-product/:id" element={<Layout><AdminEditProduct/></Layout>} />
        <Route path="/admin/all-products" element={<Layout><AdminProductList/></Layout>} />
        <Route path="/admin/manage-banners" element={<Layout><AdminBannersPage/></Layout>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
