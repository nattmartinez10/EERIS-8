import { Box, Heading, Table, Stack, Button } from "@chakra-ui/react";
import ViewExpense from "./ViewExpense";
import React, { useState } from "react";

function Expenses() {
  const [showExpense, setExpense] = useState(false);

  return (
    <Box p={8} textAlign="center">
      <Heading size="lg" mb={6}>My Expenses</Heading>
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
              <Table.Row key={expense.id}>
                <Table.Cell>{expense.name}</Table.Cell>
                <Table.Cell>{expense.dateTime}</Table.Cell>
                <Table.Cell>{expense.paymentMethod}</Table.Cell>
                <Table.Cell>{expense.totalPayment}</Table.Cell>
                <Table.Cell>{expense.status}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => setExpense(true)} colorScheme="green">View</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>

      {/* Render ViewExpense as a modal overlay */}
      {showExpense && <ViewExpense onClose={() => setExpense(false)} />}
    </Box>
  );
}

const expenses = [
  {
    id: 1,
    name: "Walmart",
    dateTime: "2025-02-13 14:30",
    paymentMethod: "Credit Card",
    totalPayment: "$150.00",
    status: 'Reviewed',
  },
  {
    id: 2,
    name: "Target",
    dateTime: "2025-02-10 09:15",
    paymentMethod: "Bank Transfer",
    totalPayment: "$85.75",
    status: 'Approved',
  },
  {
    id: 3,
    name: "Mc Donalds",
    dateTime: "2025-02-01 18:00",
    paymentMethod: "PayPal",
    totalPayment: "$40.00",
    status: 'Pending',
  },
];

export default Expenses;