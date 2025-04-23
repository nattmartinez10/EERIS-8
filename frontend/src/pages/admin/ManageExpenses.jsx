import {
  Box,
  Heading,
  Button,
  Stack,
  Text,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { useState, useEffect } from "react";
import ViewExpenseAdmin from "./ViewExpenseAdmin";
import axios from "axios";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const ManageExpenses = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleAction = async (id, action) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/receipts/${id}/state`,
        {
          state: action === "approve" ? "approved" : "rejected",
        }
      );

      setExpenses((prev) =>
        prev.map((e) => (e._id === id ? { ...e, state: res.data.state } : e))
      );
    } catch (err) {
      console.error("❌ Failed to update receipt state:", err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/receipts/all");
      setExpenses(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch receipts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const bgColor = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const labelColor = useColorModeValue("gray.600", "gray.300");

  const getStatusCircleColor = (status) => {
    switch (status) {
      case "approved":
        return "green.400";
      case "rejected":
        return "red.400";
      case "pending":
        return "orange.400";
      default:
        return "gray.400";
    }
  };

  const handleSort = (key) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
    const sorted = [...expenses].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];
      if (key === "uploadedBy") {
        valA = a.uploadedBy?.name || "";
        valB = b.uploadedBy?.name || "";
      }
      if (key === "date") {
        valA = new Date(a.date);
        valB = new Date(b.date);
      }
      if (valA < valB) return newOrder === "asc" ? -1 : 1;
      if (valA > valB) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setExpenses(sorted);
  };

  const renderSortIndicator = (key) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? (
      <ChevronUpIcon style={{ display: "inline" }} />
    ) : (
      <ChevronDownIcon style={{ display: "inline" }} />
    );
  };

  return (
    <Box p={8}>
      <Heading size="lg" mb={6} color={textColor}>
        Manage Submitted Expenses
      </Heading>

      {loading ? (
        <Spinner size="xl" color="blue.500" />
      ) : expenses.length === 0 ? (
        <Text color={textColor}>No submitted expenses found.</Text>
      ) : (
        <Box
          overflowX="auto"
          borderRadius="lg"
          bg={bgColor}
          p={4}
          boxShadow="md"
        >
          <VStack spacing={4} align="stretch">
            <HStack
              spacing={6}
              bg={headerBg}
              p={2}
              borderBottomWidth="1px"
              borderColor={borderColor}
              color={labelColor}
            >
              <Box
                flex="1"
                fontWeight="bold"
                cursor="pointer"
                onClick={() => handleSort("uploadedBy")}
              >
                Employee {renderSortIndicator("uploadedBy")}
              </Box>
              <Box
                flex="1"
                fontWeight="bold"
                cursor="pointer"
                onClick={() => handleSort("date")}
              >
                Date {renderSortIndicator("date")}
              </Box>
              <Box
                flex="1"
                fontWeight="bold"
                cursor="pointer"
                onClick={() => handleSort("total")}
              >
                Total {renderSortIndicator("total")}
              </Box>
              <Box flex="1" fontWeight="bold">
                Payment
              </Box>
              <Box
                flex="1"
                fontWeight="bold"
                cursor="pointer"
                onClick={() => handleSort("state")}
              >
                Status {renderSortIndicator("state")}
              </Box>
              <Box flex="2" fontWeight="bold">
                Actions
              </Box>
            </HStack>

            {expenses.map((expense) => (
              <HStack
                key={expense._id}
                spacing={6}
                p={2}
                borderBottomWidth="1px"
                borderColor={borderColor}
                color={textColor}
              >
                <Box flex="1">{expense.uploadedBy?.name || "Unknown"}</Box>
                <Box flex="1">
                  {new Date(expense.date).toLocaleDateString()}
                </Box>
                <Box flex="1">${expense.total.toFixed(2)}</Box>
                <Box flex="1">{expense.paymentMethod}</Box>
                <Box flex="1">
                  <HStack>
                    <Box
                      w={3}
                      h={3}
                      borderRadius="full"
                      bg={getStatusCircleColor(expense.state)}
                    />
                    <Text fontSize="sm" textTransform="capitalize">
                      {expense.state}
                    </Text>
                  </HStack>
                </Box>
                <Box flex="2">
                  <Stack direction="row" spacing={2}>
                    <Button
                      size="sm"
                      onClick={() => setSelectedExpense(expense)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => handleAction(expense._id, "approve")}
                      isDisabled={expense.state !== "pending"}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleAction(expense._id, "reject")}
                      isDisabled={expense.state !== "pending"}
                    >
                      Reject
                    </Button>
                  </Stack>
                </Box>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}

      {selectedExpense && (
        <ViewExpenseAdmin
          data={selectedExpense}
          onClose={() => {
            setSelectedExpense(null);
            fetchExpenses();
          }}
        />
      )}
    </Box>
  );
};

export default ManageExpenses;
