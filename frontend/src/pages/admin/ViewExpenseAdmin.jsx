import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  Stack,
  Badge,
  Textarea,
} from "@chakra-ui/react";
import { X } from "lucide-react";

const ViewExpenseAdmin = ({ data, onClose }) => {
  const { id, employee, date, total, paymentMethod, status, lineItems = [] } = data;
  const [actionMode, setActionMode] = useState(null); // "reject" | "request-info"
  const [comment, setComment] = useState("");

  const handleAction = (action) => {
    // If reject or request-info, require comment
    if ((action === "reject" || action === "request-info") && !comment.trim()) {
        alert("Please provide a comment before submitting.");
        return;
    }

    // Simulate backend call
    console.log(`Action: ${action}`);
    console.log(`Comment: ${comment}`);
    console.log(`Expense ID: ${id}`);

    // TODO: send PUT/PATCH to backend with { action, comment }

    onClose();
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
        bg="white"
        p={6}
        rounded="lg"
        shadow="lg"
        maxW="600px"
        width="90%"
        position="relative"
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

        <Heading size="md" mb={4}>Expense Details</Heading>

        <Stack spacing={2}>
          <Text><strong>Employee:</strong> {employee}</Text>
          <Text><strong>Date:</strong> {date}</Text>
          <Text><strong>Payment Method:</strong> {paymentMethod}</Text>
          <Text><strong>Total:</strong> ${total}</Text>
          <Text>
            <strong>Status:</strong>{" "}
            <Badge colorScheme={getBadgeColor(status)}>{status}</Badge>
          </Text>
        </Stack>

        <Box mt={6}>
          <Heading size="sm" mb={2}>Line Items</Heading>
          <Stack spacing={1}>
            {lineItems.length > 0 ? (
              lineItems.map((item, index) => (
                <Box
                  key={index}
                  p={2}
                  bg="gray.50"
                  rounded="md"
                  border="1px solid #ccc"
                >
                  {item}
                </Box>
              ))
            ) : (
              <Text fontStyle="italic" color="gray.500">
                No line items available.
              </Text>
            )}
          </Stack>
        </Box>

        {actionMode && (
          <Box mt={6}>
            <Heading size="sm" mb={2}>
              Comment for {actionMode === "reject" ? "Rejection" : "Info Request"}
            </Heading>
            <Textarea
              placeholder="Enter your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </Box>
        )}

        <Stack direction="row" mt={6} justify="space-between">
          <Button
            colorScheme="green"
            onClick={() => handleAction("approve")}
            isDisabled={status !== "Pending"}
          >
            Approve
          </Button>
          <Button
            colorScheme="red"
            onClick={() => setActionMode("reject")}
            isDisabled={status !== "Pending"}
          >
            Reject
          </Button>
          <Button
            colorScheme="orange"
            onClick={() => setActionMode("request-info")}
            isDisabled={status !== "Pending"}
          >
            Request Info
          </Button>
        </Stack>

        {actionMode && (
          <Button
            mt={4}
            colorScheme={actionMode === "reject" ? "red" : "orange"}
            onClick={() => handleAction(actionMode)}
          >
            Submit {actionMode === "reject" ? "Rejection" : "Request"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

const getBadgeColor = (status) => {
  switch (status) {
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
    case "Pending":
      return "yellow";
    case "Waiting for Info":
      return "orange";
    default:
      return "gray";
  }
};

export default ViewExpenseAdmin;
