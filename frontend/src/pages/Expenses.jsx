import {
  Box,
  Heading,
  Table,
  Stack,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ViewExpense from "./ViewExpense";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Expenses() {
  const [showExpense, setExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/receipts", {
          params: { email: userEmail },
        });
        setExpenses(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch receipts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchExpenses();
    }
  }, [userEmail]);

  return (
    <Box p={8} textAlign="center">
      <Heading size="lg" mb={6}>
        My Expenses
      </Heading>

      {loading ? (
        <Spinner size="xl" color="blue.500" />
      ) : expenses.length === 0 ? (
        <Text>No expenses submitted yet.</Text>
      ) : (
        <Stack gap="20">
          <Table.Root size="sm" interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Business Name</Table.ColumnHeader>
                <Table.ColumnHeader>Date</Table.ColumnHeader>
                <Table.ColumnHeader>Payment Method</Table.ColumnHeader>
                <Table.ColumnHeader>Total Price</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {expenses.map((expense) => (
                <Table.Row key={expense._id}>
                  <Table.Cell>{expense.store}</Table.Cell>
                  <Table.Cell>
                    {new Date(expense.date).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{expense.paymentMethod}</Table.Cell>
                  <Table.Cell>${expense.total.toFixed(2)}</Table.Cell>
                  <Table.Cell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        w={3}
                        h={3}
                        borderRadius="full"
                        bg={
                          expense.state === "approved"
                            ? "green.400"
                            : expense.state === "rejected"
                            ? "red.400"
                            : "orange.400"
                        }
                      />
                      {expense.state.charAt(0).toUpperCase() +
                        expense.state.slice(1)}
                    </Box>
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      onClick={() => setExpense(expense)}
                      colorScheme="green"
                    >
                      View
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
      )}

      {/* Pass selected expense to modal */}
      {showExpense && (
        <ViewExpense data={showExpense} onClose={() => setExpense(false)} />
      )}
    </Box>
  );
}

export default Expenses;
