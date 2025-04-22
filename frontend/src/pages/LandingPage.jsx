import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Alert,
} from "@chakra-ui/react";

const ProfilePage = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("userEmail"); // 👈 Save this after login
      if (!email) {
        setError("No user email found in storage.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/profile?email=${email}`
        );
        const data = await response.json();

        if (response.ok) {
          setEmployee(data);
        } else {
          setError(data.message || "Failed to load profile.");
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <Alert status="error" mt={10} maxW="md" mx="auto">
        {error}
      </Alert>
    );
  }

  if (!employee) {
    return (
      <Box textAlign="center" pt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Loading profile...</Text>
      </Box>
    );
  }

  return (
    <Box p={8} maxW="md" mx="auto" textAlign="center">
      <Heading size="xl" mb={4}>
        Welcome to EERIS-8, {employee.name}!
      </Heading>
      <VStack spacing={3} align="center">
        <Text fontSize="lg" fontWeight="bold">
          Position: {employee.position}
        </Text>
        <Text fontSize="lg">Department: {employee.department}</Text>
        <Text fontSize="lg">Email: {employee.email}</Text>
      </VStack>
    </Box>
  );
};

export default ProfilePage;

