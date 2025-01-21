import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/dashboard";
import DashboardHome from "./pages/home";
import SalesManReport from "./pages/sales";
import CashierReport from "./pages/cashier";
import CounterReport from "./pages/counter";
import DepartmentReport from "./pages/department";
import InventorytReport from "./pages/inventory";
import OhtertReport from "./pages/other";
import Settings from "./pages/settings";
import { CommonProvider } from "./context/common";
import AuthLayout from "./layout/auth";
import Login from "./pages/auth/login";
import HomeLayout from "./layout/home";
import BranchesTarget from "./pages/braches";
import TargetSettings from "./pages/target";
import { AuthProvider } from "./context/auth";
import { ProtectedRoute } from "./router/protectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <CommonProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/:branchName/reports"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="salesman" element={<SalesManReport />} />
                <Route path="cashier" element={<CashierReport />} />
                <Route path="cashier" element={<CashierReport />} />
                <Route path="counter" element={<CounterReport />} />
                <Route path="department" element={<DepartmentReport />} />
                <Route path="inventory" element={<InventorytReport />} />
                <Route path="other" element={<OhtertReport />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomeLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="branches" element={<BranchesTarget />} />
                <Route path="targetSettings" element={<TargetSettings />} />
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CommonProvider>
      </AuthProvider>
    </>
  );
}

export default App;
