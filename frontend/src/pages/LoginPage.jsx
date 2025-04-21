import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Flex,
  Image,
  Container,
  HStack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import logo from "../assets/logo1.png";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter email and password.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect based on role
        window.location.href = data.redirectTo;
      } else {
        toast({
          title: "Login failed",
          description: data.message || "Invalid credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Server error. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container
      maxW="100%"
      h={"100vh"}
      px={4}
      bg={useColorModeValue("gray.100", "gray.900")}
      boxShadow="md"
    >
      
      <Box
        h="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingBottom={"50px"}
      >
        <Box boxSizing="border-box" pr={16} pl={16} pt={30} pb={30} maxW="432px" height="400px" borderWidth={1} borderRadius="lg" boxShadow="lg">
          <VStack spacing={4}>
          <Image
            width="70px"
            src={logo}
          />
          <Heading size="lg" mb={6} textAlign="center">
            Sign In
          </Heading>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" w="full" rounded="full" onClick={handleLogin}>
              Login
            </Button>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
