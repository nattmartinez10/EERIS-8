import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/add-expense" element={<AddExpense />} />
      </Routes>
    </Box>
  );
}

export default App;
