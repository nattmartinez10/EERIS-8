import { Box, Heading, HStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box p={8}>
      <Heading mb={6}>Welcome back, Admin!</Heading>

      {/*<HStack spacing={4}>
        <Button colorScheme="blue" onClick={() => navigate("/admin/manage-expenses")}>
          Manage Expenses
        </Button>
        <Button colorScheme="teal" onClick={() => navigate("/admin/reports")}>
          View Reports
        </Button>
      </HStack>*/}
    </Box>
  );
};

export default AdminDashboard;
