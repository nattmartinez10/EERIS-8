// This is a simple admin dashboard page that displays a welcome message and a placeholder for admin tools.
import React from "react";
import { useNavigate } from "react-router-dom";
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
          <Text>As an admin you are the only to approve or reject expenses, add users and check reports</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminDashboard;
