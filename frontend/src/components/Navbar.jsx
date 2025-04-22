import {
  Container,
  Flex,
  Link as ChakraLink,
  HStack,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import logo from "../assets/logo1.png";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("gray.800", "white");
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // 'admin' or 'employee'

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container
      maxW="100%"
      px={4}
      bg={useColorModeValue("gray.100", "gray.900")}
      boxShadow="md"
    >
      <Flex h={16} align="center" justify="space-between" wrap="wrap" px={6}>
        {/* Logo */}
        <Image src={logo} alt="Logo" boxSize="40px" objectFit="contain" />

        {/* Navigation Links */}
        <HStack spacing={8}>
          {role === "employee" && (
            <>
              <ChakraLink
                as={Link}
                to="/profile"
                fontSize="lg"
                fontWeight="bold"
                color={textColor}
                _hover={{ color: "blue.500" }}
              >
                Home
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/expenses"
                fontSize="lg"
                fontWeight="bold"
                color={textColor}
                _hover={{ color: "blue.500" }}
              >
                My Expenses
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/add-expense"
                fontSize="lg"
                fontWeight="bold"
                color={textColor}
                _hover={{ color: "blue.500" }}
              >
                Add Expense
              </ChakraLink>
            </>
          )}

          {role === "admin" && (
            <>
              <ChakraLink
                as={Link}
                to="/admin/dashboard"
                fontSize="lg"
                fontWeight="bold"
                color={textColor}
                _hover={{ color: "blue.500" }}
              >
                Dashboard
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/admin/manage-expenses"
                fontSize="lg"
                fontWeight="bold"
                color={textColor}
                _hover={{ color: "blue.500" }}
              >
                Manage Expenses
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/admin/reports"
                fontSize="lg"
                fontWeight="bold"
                color={textColor}
                _hover={{ color: "blue.500" }}
              >
                Reports
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/admin/create-user"
                fontSize="lg"
                fontWeight="bold"
                color={textColor}
                _hover={{ color: "blue.500" }}
              >
                Create User
              </ChakraLink>
            </>
          )}
        </HStack>

        {/* Right Side: Dark Mode and Logout */}
        <HStack spacing={4}>
          <Button onClick={toggleColorMode} rounded={"full"}>
            {colorMode === "light" ? <LuMoon /> : <LuSun size={20} />}
          </Button>
          <Button onClick={handleLogout} colorScheme="red" variant="outline" size="sm">
            Log Out
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
