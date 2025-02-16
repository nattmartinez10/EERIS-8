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
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogin = () => {
    // Simulating authentication
    // TODO: Implement the logic with the backend
    if (email && password) {
      window.location.href = "/profile";
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
      <Flex h={16} align="center" justify="space-between" wrap="wrap" px={6}>
        {/* Logo */}
        <Image src={logo} alt="Logo" boxSize="40px" objectFit="contain" />
        <HStack spacing={4}>
          <Button onClick={toggleColorMode} rounded={"full"}>
            {colorMode === "light" ? <LuMoon /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
      <Box
        h="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingBottom={"50px"}
      >
        <Box p={8} maxW="md" borderWidth={1} borderRadius="lg" boxShadow="lg">
          <Heading size="lg" mb={6} textAlign="center">
            Login
          </Heading>
          <VStack spacing={4}>
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
            <Button colorScheme="blue" w="full" onClick={handleLogin}>
              Login
            </Button>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
