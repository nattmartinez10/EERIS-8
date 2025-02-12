import { Box, Heading, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6} p={8} bg="white" rounded="xl" boxShadow="lg">
        <Heading size="xl" color="teal.600">
          Welcome to EERIS-8
        </Heading>
        <Button as={Link} to="/expenses" colorScheme="blue" size="lg" width="full">
          My Expenses
        </Button>
        <Button as={Link} to="/add-expense" colorScheme="green" size="lg" width="full">
          Add Expense
        </Button>
      </VStack>
    </Box>
  );
}

export default LandingPage;
