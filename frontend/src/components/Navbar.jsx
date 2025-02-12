import { Container, Flex, Text, Link as ChakraLink, IconButton, HStack} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";

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
        {/* Navigation Links */}
        <HStack spacing={8}>
          <ChakraLink as={Link} to="/" fontSize="lg" fontWeight="bold" color={textColor} _hover={{ color: "blue.500" }}>
            Home
          </ChakraLink>
          <ChakraLink as={Link} to="/expenses" fontSize="lg" fontWeight="bold" color={textColor} _hover={{ color: "blue.500" }}>
            My Expenses
          </ChakraLink>
          <ChakraLink as={Link} to="/add-expense" fontSize="lg" fontWeight="bold" color={textColor} _hover={{ color: "blue.500" }}>
            Add Expense
          </ChakraLink>
        </HStack>

        {/* Dark Mode Toggle Button */}
        <IconButton
          icon={colorMode === "light" ? <Moon /> : <Sun />}
          aria-label="Toggle Dark Mode"
          onClick={toggleColorMode}
          colorScheme="gray"
        />
      </Flex>
    </Container>
  );
};

export default NavBar;

