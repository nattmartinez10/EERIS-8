import { Container, Flex, Text, Link as ChakraLink, IconButton, HStack, Button, Image, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuMoon, LuSun } from "react-icons/lu"
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import logo from "../assets/logo1.png"; 


const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("gray.800", "white"); // Light/Dark mode text color

  return (
    <Container maxW="100%" px={4} bg={useColorModeValue("gray.100", "gray.900")} boxShadow="md">
      <Flex
        h={16}
        align="center"
        justify="space-between"
        wrap="wrap"
        px={6}
      >
        {/* Logo */}
        <Image src={logo} alt="Logo" boxSize="40px" objectFit="contain"/>

        {/* Navigation Links */}
        <HStack spacing={8}>
          <ChakraLink as={Link} to="/profile" fontSize="lg" fontWeight="bold" color={textColor} _hover={{ color: "blue.500" }}>
            Home
          </ChakraLink>
          <ChakraLink as={Link} to="/expenses" fontSize="lg" fontWeight="bold" color={textColor} _hover={{ color: "blue.500" }}>
            My Expenses
          </ChakraLink>
          <ChakraLink as={Link} to="/add-expense" fontSize="lg" fontWeight="bold" color={textColor} _hover={{ color: "blue.500" }}>
            Add Expense
          </ChakraLink>
        </HStack>

        {/* Right-Side Icons (Dark Mode + Profile) */}
        <HStack spacing={4}>
          <Button onClick={toggleColorMode} rounded={"full"}>
            {colorMode === "light" ? <LuMoon /> : <LuSun size={20} />}
          </Button>

        
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;

