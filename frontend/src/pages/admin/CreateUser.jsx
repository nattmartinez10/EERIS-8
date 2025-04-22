import { Box, Heading, Input, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    position: "",
    department: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ User created successfully!");
        console.log("Created user:", formData);
        setFormData({
          email: "",
          password: "",
          name: "",
          position: "",
          department: "",
          role: "employee",
        });
      } else {
        const errorData = await response.json();
        alert(`❌ Error: ${errorData.message || "Failed to create user."}`);
        console.error("Backend error:", errorData);
      }
    } catch (error) {
      alert(`❌ Server error: ${error.message}`);
      console.error("Network error:", error);
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading size="lg" mb={6}>
        Create New User
      </Heading>

      <VStack spacing={4}>
        <Box w="100%">
          <Box as="label" fontWeight="semibold" mb={1} display="block">
            Email
          </Box>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>

        <Box w="100%">
          <Box as="label" fontWeight="semibold" mb={1} display="block">
            Password
          </Box>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Box>

        <Box w="100%">
          <Box as="label" fontWeight="semibold" mb={1} display="block">
            Name
          </Box>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Box>

        <Box w="100%">
          <Box as="label" fontWeight="semibold" mb={1} display="block">
            Position
          </Box>
          <Input
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </Box>

        <Box w="100%">
          <Box as="label" fontWeight="semibold" mb={1} display="block">
            Department
          </Box>
          <Input
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </Box>

        <Box w="100%">
          <Box as="label" fontWeight="semibold" mb={1} display="block">
            Role
          </Box>
          <Box
            as="select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            border="1px solid #E2E8F0"
            borderRadius="md"
            p={2}
            w="100%"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </Box>
        </Box>

        <Button colorScheme="blue" w="full" onClick={handleSubmit}>
          Create User
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateUser;
