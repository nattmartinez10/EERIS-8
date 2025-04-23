import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
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
import { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    totalAmount: 0,
    employees: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const cardBg = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/receipts/all");
        const receipts = res.data;

        const totalAmount = receipts.reduce((sum, r) => sum + r.total, 0);
        const totalExpenses = receipts.length;
        const employeeMap = new Map();
        const categoryMap = new Map();

        receipts.forEach((receipt) => {
          const name = receipt.uploadedBy?.name || "Unknown";
          employeeMap.set(name, (employeeMap.get(name) || 0) + receipt.total);

          receipt.items?.forEach((item) => {
            const category = item.category || "Other";
            categoryMap.set(category, (categoryMap.get(category) || 0) + item.price);
          });
        });

        const employees = employeeMap.size;
        const employeeData = Array.from(employeeMap, ([name, total]) => ({ name, total }));
        const categoryData = Array.from(categoryMap, ([name, value]) => ({ name, value }));

        setSummary({ totalAmount, totalExpenses, employees });
        setEmployeeData(employeeData);
        setCategoryData(categoryData);
      } catch (err) {
        console.error("❌ Error loading reports:", err);
      }
    };

    fetchData();
  }, []);

  const colors = ["#3182CE", "#2B6CB0", "#63B3ED", "#4FD1C5", "#ED8936"];

  return (
    <Box p={8}>
      <Heading mb={6}>Reports Page</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Box p={4} bg={cardBg} rounded="md" shadow="sm">
          <Text fontWeight="bold">Total Expenses</Text>
          <Text fontSize="xl">{summary.totalExpenses}</Text>
        </Box>

        <Box p={4} bg={cardBg} rounded="md" shadow="sm">
          <Text fontWeight="bold">Total Amount Spent</Text>
          <Text fontSize="xl">${summary.totalAmount.toFixed(2)}</Text>
        </Box>

        <Box p={4} bg={cardBg} rounded="md" shadow="sm">
          <Text fontWeight="bold">Employees</Text>
          <Text fontSize="xl">{summary.employees}</Text>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {/* Pie Chart */}
        <Box bg={cardBg} p={4} rounded="md" shadow="sm">
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
        <Box bg={cardBg} p={4} rounded="md" shadow="sm">
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
