import {
    Box,
    Heading,
    Button,
    Badge,
    Stack,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import ViewExpenseAdmin from "./ViewExpenseAdmin";
  
  const ManageExpenses = () => {
    const [selectedExpense, setSelectedExpense] = useState(null);
  
    const handleAction = (id, action) => {
      console.log(`Performing ${action} on expense ${id}`);
      // TODO: Send request to backend here (PUT /api/expenses/:id)
    };
  
    return (
      <Box p={8}>
        <Heading size="lg" mb={6}>
          Manage Submitted Expenses
        </Heading>
  
        <Box overflowX="auto" borderRadius="lg" bg="white" p={4} boxShadow="md">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Employee</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Payment</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td style={tdStyle}>{expense.employee}</td>
                  <td style={tdStyle}>{expense.date}</td>
                  <td style={tdStyle}>${expense.total}</td>
                  <td style={tdStyle}>{expense.paymentMethod}</td>
                  <td style={tdStyle}>
                    <Badge colorScheme={getBadgeColor(expense.status)}>
                      {expense.status}
                    </Badge>
                  </td>
                  <td style={tdStyle}>
                    <Stack direction="row" spacing={2}>
                      <Button size="sm" onClick={() => setSelectedExpense(expense)}>
                        View
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => handleAction(expense.id, "approve")}
                        isDisabled={expense.status !== "Pending"}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleAction(expense.id, "reject")}
                        isDisabled={expense.status !== "Pending"}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="orange"
                        onClick={() => handleAction(expense.id, "request-info")}
                        isDisabled={expense.status !== "Pending"}
                      >
                        Request Info
                      </Button>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
  
        {/* View Expense Modal */}
        {selectedExpense && (
          <ViewExpenseAdmin
            data={selectedExpense}
            onClose={() => setSelectedExpense(null)}
          />
        )}
      </Box>
    );
  };
  
  // Styling for native table elements
  const thStyle = {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #e2e8f0",
    background: "#f7fafc",
  };
  
  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #e2e8f0",
  };
  
  const mockExpenses = [
    {
      id: "1",
      employee: "John Doe",
      date: "2025-04-12",
      total: 120.45,
      paymentMethod: "Credit Card",
      status: "Pending",
    },
    {
      id: "2",
      employee: "Jane Smith",
      date: "2025-04-10",
      total: 75.0,
      paymentMethod: "Cash",
      status: "Approved",
    },
    {
      id: "3",
      employee: "Carlos Perez",
      date: "2025-04-09",
      total: 200.99,
      paymentMethod: "Bank Transfer",
      status: "Pending",
    },
  ];
  
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
  
  export default ManageExpenses;
  