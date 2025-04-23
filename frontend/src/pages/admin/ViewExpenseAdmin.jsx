import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  Stack,
  Badge,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { X } from "lucide-react";
import axios from "axios";

const ViewExpenseAdmin = ({ data, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Theming for light/dark mode
  const cardBg = useColorModeValue("white", "gray.800");
  const imageBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textSecondary = useColorModeValue("gray.500", "gray.400");
  const itemBg = useColorModeValue("gray.50", "gray.700");

  const handleAction = async (action) => {
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:5000/api/receipts/${data._id}/state`, {
        state: action,
      });
      alert(`✅ Receipt successfully ${action}.`);
      onClose(); // Close the modal after update
    } catch (err) {
      console.error("❌ Failed to update receipt:", err);
      alert("❌ Error updating receipt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      backdropFilter="blur(6px)"
      zIndex={1000}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg={cardBg}
        p={6}
        rounded="lg"
        shadow="lg"
        maxW="700px"
        width="90%"
        position="relative"
        maxHeight="95vh"
        overflowY="auto"
      >
        <Button
          position="absolute"
          top="16px"
          right="16px"
          variant="ghost"
          onClick={onClose}
        >
          <X />
        </Button>

        <Heading size="md" mb={4}>
          Expense Details
        </Heading>

        <VStack spacing={6} align="stretch" mb={4}>
          <a
            href={data.image}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              borderRadius: "8px",
              overflow: "hidden",
              maxHeight: "400px",
              background: imageBg,
              border: `1px solid ${borderColor}`,
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
        </VStack>

        <Stack spacing={2}>
          <Text>
            <strong>Employee:</strong> {data.uploadedBy?.name || "Unknown"}
          </Text>
          <Text>
            <strong>Date:</strong> {new Date(data.date).toLocaleString()}
          </Text>
          <Text>
            <strong>Payment Method:</strong> {data.paymentMethod}
          </Text>
          <Text>
            <strong>Total:</strong> ${data.total.toFixed(2)}
          </Text>
          <Text>
            <strong>Status:</strong>{" "}
            <Badge
              colorScheme={getBadgeColor(data.state)}
              textTransform="capitalize"
            >
              {data.state}
            </Badge>
          </Text>
        </Stack>

        <Box mt={6}>
          <Heading size="sm" mb={2}>
            Line Items
          </Heading>
          <Stack spacing={1}>
            {data.items?.length > 0 ? (
              data.items.map((item, index) => (
                <Box
                  key={index}
                  p={2}
                  bg={itemBg}
                  rounded="md"
                  border={`1px solid ${borderColor}`}
                >
                  {item.item} - ${item.price.toFixed(2)}
                </Box>
              ))
            ) : (
              <Text fontStyle="italic" color={textSecondary}>
                No line items available.
              </Text>
            )}
          </Stack>
        </Box>

        <Stack direction="row" mt={6} justify="space-between">
          <Button
            colorScheme="green"
            isDisabled={data.state !== "pending" || isSubmitting}
            onClick={() => handleAction("approved")}
          >
            Approve
          </Button>
          <Button
            colorScheme="red"
            isDisabled={data.state !== "pending" || isSubmitting}
            onClick={() => handleAction("rejected")}
          >
            Reject
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

const getBadgeColor = (status) => {
  switch (status) {
    case "approved":
      return "green";
    case "rejected":
      return "red";
    case "pending":
      return "yellow";
    default:
      return "gray";
  }
};

export default ViewExpenseAdmin;