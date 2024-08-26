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
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import FavoritesPage from "./pages/FavoritesPage";
import CategoryPage from "./pages/CategoryPage";
import { useAppContext } from "./contexts/AppContext";
import AdminHomePhotos from "./pages/AdminHomePhotos";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ScrollToTop from "./ScrollToTop";

function App() {
  const { isLoggedIn, isAdmin } = useAppContext()
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />

        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />

        <Route path="/sub-category/:subcategory" element={<Layout><SubCategoryPage /></Layout>} />
        <Route path="/category/:category" element={<Layout><CategoryPage /></Layout>} />
        <Route path="/all-products" element={<Layout><AllProductsPage /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />

        {isLoggedIn &&
          <>
            <Route path="/favorites" element={<Layout><FavoritesPage /></Layout>} />
            <Route path="/my-orders/" element={<Layout><MyOrdersPage /></Layout>} />
            <Route path="/order-details/:id" element={<Layout><OrderDetailsPage /></Layout>} />
          </>

        }
        {
          isAdmin && <>
            <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
            <Route path="/admin/add-product" element={<Layout><AdminAddProduct /></Layout>} />
            <Route path="/admin/edit-product/:id" element={<Layout><AdminEditProduct /></Layout>} />
            <Route path="/admin/all-products" element={<Layout><AdminProductList /></Layout>} />
            <Route path="/admin/manage-banners" element={<Layout><AdminBannersPage /></Layout>} />
            <Route path="/admin/manage-home-photos" element={<Layout><AdminHomePhotos /></Layout>} />
            <Route path="/admin/manage-orders" element={<Layout><AdminOrdersPage /></Layout>} />

          </>
        }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
