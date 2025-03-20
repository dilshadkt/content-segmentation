import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CommonProvider } from "./context/common";
import AuthLayout from "./layout/auth";
import DashboardLayout from "./layout/dashboard";
import Login from "./pages/auth/login";
import CashierReport from "./pages/cashier";
import DashboardHome from "./pages/home";
import Forcasting from "./pages/forcasting";
import Segmentation from "./pages/segmentation";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";

function App() {
  return (
    <>
      <CommonProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="cashier" element={<CashierReport />} />
              <Route path="segmentation" element={<Segmentation />} />
              <Route path="forcasting" element={<Forcasting />} />
            </Route>

            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CommonProvider>
    </>
  );
}

export default App;
