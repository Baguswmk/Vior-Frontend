import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProductsPage,
  BestSellingPage,
  ActivationPage,
  ProfilePage,
  ProductDetailsPage,
  CheckoutPage,
  PaymentPage,
  OrderDetailsPage,
  OrderSuccessPage,
  UserInbox,
  TrackOrderPage,
} from "./routes/Routes.js";
import { AdminDashboardPage, AdminDashboardUsers, AdminDashboardOrders, AdminDashboardProducts, AdminDashboardWithdraw, AdminDashboardCategory } from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute.js";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import ProtectedDesainerRoute from "./routes/ProtectedDesainerRoute.js";
import "react-toastify/dist/ReactToastify.css";
import {
  DesainerDashboardPage,
  DesainerCreateProduct,
  DesainerAllProducts,
  DesainerPreviewPage,
  DesainerAllOrders,
  DesainerOrderDetails,
  DesainerSettingsPage,
  DesainerAllWithdraw,
  // DesainerInboxPage,
  DesainerHomePage,
} from "./routes/DesainerRoutes";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user.js";
import { getAllProducts } from "./redux/actions/product";
import { useDispatch } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/message"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-category"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardCategory />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />

        {/* Desainer Routes */}
        <Route path="/desainer/preview/:id" element={<DesainerPreviewPage />} />

        <Route
          path="/desainer/:id"
          element={
            <ProtectedDesainerRoute>
              <DesainerHomePage />
            </ProtectedDesainerRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedDesainerRoute>
              <DesainerSettingsPage />
            </ProtectedDesainerRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedDesainerRoute>
              <DesainerDashboardPage />
            </ProtectedDesainerRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <ProtectedDesainerRoute>
              <DesainerCreateProduct />
            </ProtectedDesainerRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <ProtectedDesainerRoute>
              <DesainerAllOrders />
            </ProtectedDesainerRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedDesainerRoute>
              <DesainerOrderDetails />
            </ProtectedDesainerRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <ProtectedDesainerRoute>
              <DesainerAllProducts />
            </ProtectedDesainerRoute>
          }
        />
        <Route
          path="/dashboard-withdraw"
          element={
            <ProtectedDesainerRoute>
              <DesainerAllWithdraw />
            </ProtectedDesainerRoute>
          }
        />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </BrowserRouter>
  );
};

export default App;
