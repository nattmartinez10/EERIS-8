import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Button,
  VStack,
} from "@chakra-ui/react";

const AdminDashboard = () => {
  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={6}>
        <Heading as="h1" size="xl">
          Admin Dashboard
        </Heading>
        <Text fontSize="lg">Welcome, Admin! This is your dashboard.</Text>
        <Box
          p={6}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="md"
          width="100%"
          textAlign="center"
        >
          <Text>This is a placeholder for admin-specific tools and reports.</Text>
        </Box>
        <Button colorScheme="red" onClick={() => (window.location.href = "/")}>
          Log Out
        </Button>
      </VStack>
    </Container>
  );
};

export default AdminDashboard;
