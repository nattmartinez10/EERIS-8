import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  Spinner,
  VStack,
  Input,
} from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function AddExpense() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    website: "",
    date: "",
    item: "",
    totalPayment: "",
    paymentMethod: "",
    line_items: [],
    detailed_items: [],
  });

  const handleDrop = async (files) => {
    if (files.length > 0) {
      const uploadedFile = files[0];
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const res = await axios.post("http://localhost:5001/api/detect-receipt", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const data = res.data;

        const detailed = [];
        const regex = /^\s*(\d+)\s+(.\S)\s+(\(?)\$([0-9.]+)\)?\s$/;
        data.raw_text?.split("\n").forEach((line) => {
          const match = line.match(regex);
          if (match) {
            detailed.push({
              quantity: match[1],
              label: match[2],
              price: match[4],
            });
          }
        });

        setForm({
          name: data.store_name || "",
          phone: data.phone || "",
          address: data.address || "",
          website: data.website || "",
          date: data.date || "",
          item: data.line_items?.map((i) => `${i.item} ($${i.price})`).join(", ") || "",
          totalPayment: data.total || "",
          paymentMethod: data.payment_method || "",
          line_items: data.line_items || [],
          detailed_items: detailed,
        });
      } catch (error) {
        console.error("Receipt detection failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLineItemChange = (index, field, value) => {
    const updated = [...form.line_items];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, line_items: updated }));
  };

  const handleDetailedItemChange = (index, field, value) => {
    const updated = [...form.detailed_items];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, detailed_items: updated }));
  };

  return (
    <Box p={8} textAlign="center">
      <Heading size="lg" pb={5}>Add a New Expense</Heading>

      <Box display="flex" justifyContent="center" mb={4}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => handleDrop(e.target.files)}
          style={{
            padding: "20px",
            border: "2px dashed #ccc",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "500px",
          }}
        />
      </Box>

      {previewUrl && (
        <Box mb={6}>
          <Text mb={2}>Receipt Preview:</Text>
          <Image src={previewUrl} alt="Uploaded receipt" maxH="300px" mx="auto" />
        </Box>
      )}

      {isLoading ? (
        <VStack spacing={4} mt={8}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          <Text fontSize="lg" color="gray.600">Extracting receipt data...</Text>
        </VStack>
      ) : (
        <Box textAlign="left" maxW="4xl" mx="auto" mt={8}>
          <Table.Root size="sm" striped>
            
            <Table.Body>
              {[
                { label: "Store", name: "name" },
                { label: "Phone", name: "phone" },
                { label: "Address", name: "address" },
                { label: "Website", name: "website" },
                { label: "Date", name: "date" },
                { label: "Total", name: "totalPayment" },
                { label: "Payment Method", name: "paymentMethod" },
              ].map((attr, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell fontWeight="bold">{attr.label}</Table.Cell>
                  <Table.Cell>
                    <Input
                      size="sm"
                      name={attr.name}
                      value={form[attr.name]}
                      onChange={handleChange}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          {form.line_items.length > 0 && (
            <Box mt={6}>
              <Heading size="md" mb={3}>Line Items</Heading>
              <Table.Root size="sm" striped>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Item</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {form.line_items.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Input
                          size="sm"
                          value={item.item}
                          onChange={(e) =>
                            handleLineItemChange(index, "item", e.target.value)
                          }
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <Input
                          size="sm"
                          value={item.price}
                          onChange={(e) =>
                            handleLineItemChange(index, "price", e.target.value)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          )}

          {form.detailed_items.length > 0 && (
            <Box mt={6}>
              <Heading size="md" mb={3}>Detailed Items</Heading>
              <Table.Root size="sm" striped>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                    <Table.ColumnHeader>Item</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {form.detailed_items.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Input
                          size="sm"
                          value={item.quantity}
                          onChange={(e) =>
                            handleDetailedItemChange(index, "quantity", e.target.value)
                          }
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          size="sm"
                          value={item.label}
                          onChange={(e) =>
                            handleDetailedItemChange(index, "label", e.target.value)
                          }
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <Input
                          size="sm"
                          value={item.price}
                          onChange={(e) =>
                            handleDetailedItemChange(index, "price", e.target.value)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          )}
        </Box>
      )}

      <Button mt={8}>Submit Receipt</Button>
    </Box>
  );
}

export default AddExpense;

