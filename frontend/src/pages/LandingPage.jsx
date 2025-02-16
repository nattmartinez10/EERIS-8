import { Box, Heading, Text, VStack } from "@chakra-ui/react";

// Example Employee Data
const employee = {
  name: "John Doe",
  position: "Software Engineer",
  department: "IT Department",
  email: "johndoe@eeris8.com",
};

const ProfilePage = () => {
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
