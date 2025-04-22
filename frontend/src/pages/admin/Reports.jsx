import {
    Box,
    Heading,
    Text,
    SimpleGrid,
  } from "@chakra-ui/react";
  import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";
  
  const Reports = () => {
    const summary = {
      totalExpenses: 150,
      totalAmount: 48750.75,
      employees: 12,
    };
  
    const categoryData = [
      { name: "Travel", value: 18000 },
      { name: "Food", value: 12500 },
      { name: "Supplies", value: 8000 },
      { name: "Entertainment", value: 3500 },
      { name: "Other", value: 4750 },
    ];
  
    const employeeData = [
      { name: "John", total: 7500 },
      { name: "Jane", total: 6200 },
      { name: "Carlos", total: 4800 },
      { name: "Sarah", total: 4200 },
      { name: "Lina", total: 3900 },
    ];
  
    const colors = ["#3182CE", "#2B6CB0", "#63B3ED", "#4FD1C5", "#ED8936"];
  
    return (
      <Box p={8}>
        <Heading mb={6}>Reports Page</Heading>
  
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Box p={4} bg="white" rounded="md" shadow="sm">
            <Text fontWeight="bold">Total Expenses</Text>
            <Text fontSize="xl">{summary.totalExpenses}</Text>
          </Box>
  
          <Box p={4} bg="white" rounded="md" shadow="sm">
            <Text fontWeight="bold">Total Amount Spent</Text>
            <Text fontSize="xl">${summary.totalAmount.toFixed(2)}</Text>
          </Box>
  
          <Box p={4} bg="white" rounded="md" shadow="sm">
            <Text fontWeight="bold">Employees</Text>
            <Text fontSize="xl">{summary.employees}</Text>
          </Box>
        </SimpleGrid>
  
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* Pie Chart */}
          <Box bg="white" p={4} rounded="md" shadow="sm">
            <Heading size="sm" mb={4}>
              Category Breakdown
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
  
          {/* Bar Chart */}
          <Box bg="white" p={4} rounded="md" shadow="sm">
            <Heading size="sm" mb={4}>
              Spending by Employee
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3182CE" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </SimpleGrid>
      </Box>
    );
  };
  
  export default Reports;
  