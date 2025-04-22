import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard"; 
import ManageExpenses from "./pages/admin/ManageExpenses";
import Reports from "./pages/admin/Reports";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
  const location = useLocation();

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {/* Only hide navbar on login page */}
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Employee Routes */}
        <Route path="/profile" element={<LandingPage />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/add-expense" element={<AddExpense />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-expenses" element={<ManageExpenses />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Routes>
    </Box>
  );
}

export default App;
