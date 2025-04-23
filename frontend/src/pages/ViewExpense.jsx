import {
  Box,
  Image,
  VStack,
  HStack,
  Link,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
const ViewExpense = ({ data, onClose }) => {
  const bgCard = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const lineItemBg = useColorModeValue("white", "gray.700");
  const linkColor = useColorModeValue("blue.600", "blue.300");
  const headingColor = useColorModeValue("blue.700", "blue.200");

  if (!data) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bg="blackAlpha.600"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={1000}
    >
      <Box
        bg={bgCard}
        color={textColor}
        borderRadius="lg"
        p={6}
        maxW="5xl"
        width="100%"
        maxHeight="90vh"
        overflowY="auto"
        position="relative"
        boxShadow="lg"
      >
        <Button
          onClick={onClose}
          position="absolute"
          top={3}
          right={3}
          size="sm"
          colorScheme="gray"
        >
          Close
        </Button>

        <VStack spacing={6} align="stretch">
          <a
            href={data.image}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              borderRadius: "8px",
              overflow: "hidden",
              maxHeight: "400px",
              background: lineItemBg,
              border: "1px solid #ccc",
            }}
          >
            <Image
              src={data.image}
              alt="Receipt"
              w="100%"
              maxH="400px"
              objectFit="contain"
              borderRadius="md"
              cursor="pointer"
            />
          </a>

          <HStack align="start" spacing={8} flexWrap="wrap">
            {/* Receipt Info */}
            <Box flex={1} minW="250px">
              <Heading size="sm" mb={2} color={headingColor}>
                Details
              </Heading>
              <Text><strong>Store:</strong> {data.store}</Text>
              <Text><strong>Phone:</strong> {data.phone || "N/A"}</Text>
              <Text><strong>Address:</strong> {data.address || "N/A"}</Text>
              <Text>
                <strong>Website:</strong>{" "}
                {data.website ? (
                  <Link href={data.website} isExternal color={linkColor}>
                    {data.website}
                  </Link>
                ) : (
                  "N/A"
                )}
              </Text>
              <Text><strong>Date:</strong> {new Date(data.date).toLocaleString()}</Text>
              <Text><strong>Category:</strong> {data.category || "N/A"}</Text>
              <Text><strong>Payment Method:</strong> {data.paymentMethod}</Text>
              <Text><strong>Total:</strong> ${data.total.toFixed(2)}</Text>
              <Text><strong>Status:</strong> {data.state}</Text>
            </Box>

            {/* Line Items */}
            <Box flex={1} minW="250px" maxH="260px" overflowY="auto">
              <Heading size="sm" mb={2} color={headingColor}>
                Line Items
              </Heading>
              <VStack spacing={2} align="stretch">
                {data.items && data.items.length > 0 ? (
                  data.items.map((item, idx) => (
                    <Box
                      key={idx}
                      p={2}
                      bg={lineItemBg}
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      {item.item} - ${item.price.toFixed(2)}
                    </Box>
                  ))
                ) : (
                  <Text>No line items available.</Text>
                )}
              </VStack>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ViewExpense;
