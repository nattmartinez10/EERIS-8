import { Box, Heading, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <Box h="100%" display="flex" alignItems="start" justifyContent="center">
      <VStack spacing={6} p={8} rounded="xl" boxShadow="lg">
        <Heading size="xl">
          Welcome to EERIS-8
        </Heading>
      </VStack>
    </Box>
  );
}

export default LandingPage;
