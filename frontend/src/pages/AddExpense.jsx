"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  Spinner,
  VStack,
  Input,
  Table,
  Portal,
  Select,
  SelectRoot,
  SelectItem,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectIndicatorGroup,
  SelectControl,
  SelectContent,
  SelectPositioner,
  createListCollection,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const categories = createListCollection({
  items: [
    { label: "Groceries", value: "Groceries" },
    { label: "Restaurant", value: "Restaurant" },
    { label: "Electronics", value: "Electronics" },
    { label: "Clothing", value: "Clothing" },
    { label: "Transportation", value: "Transportation" },
    { label: "Utilities", value: "Utilities" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Medical", value: "Medical" },
    { label: "Other", value: "Other" },
  ],
});

const paymentMethods = createListCollection({
  items: [
    { label: "Cash", value: "Cash" },
    { label: "Credit Card", value: "Credit Card" },
    { label: "Debit Card", value: "Debit Card" },
    { label: "Mobile Payment", value: "Mobile Payment" },
    { label: "Other", value: "Other" },
  ],
});

function AddExpense() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    website: "",
    date: "",
    category: "Other",
    item: "",
    totalPayment: "",
    paymentMethod: "Other",
    line_items: [{ item: "", price: "" }],
    detailed_items: [],
  });

  const handleDrop = async (files) => {
    if (files.length > 0) {
      const uploadedFile = files[0];
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
      setIsLoading(true);

      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });

      const base64 = await toBase64(uploadedFile);
      setImageBase64(base64);

      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const res = await axios.post(
          "http://localhost:5000/api/detect-receipt",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const data = res.data;

        setForm((prev) => ({
          ...prev,
          name: data.store_name || "",
          phone: data.phone || "",
          address: data.address || "",
          website: data.website || "",
          date: data.date || "",
          category: data.category || "Other",
          paymentMethod: data.payment_method || "Other",
          item:
            data.line_items?.map((i) => `${i.item} ($${i.price})`).join(", ") ||
            "",
          totalPayment: data.total || "",
          line_items: data.line_items?.length
            ? data.line_items
            : [{ item: "", price: "" }],
          detailed_items: [],
          image: imageBase64,
        }));
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

  const handleSubmit = async () => {
    const email = localStorage.getItem("userEmail");
    const items = form.line_items
      .filter((i) => i.item.trim() !== "" && !isNaN(i.price) && i.price !== "")
      .map((i) => ({
        item: i.item,
        price: parseFloat(i.price),
      }));

    if (!email) {
      alert("User email not found. Please log in again.");
      return;
    }

    try {
      const payload = {
        email,
        store: form.name,
        phone: form.phone,
        address: form.address,
        website: form.website,
        date: form.date,
        category: form.category,
        total: parseFloat(form.totalPayment),
        paymentMethod: form.paymentMethod,
        image: imageBase64,
        items,
      };

      const res = await axios.post("http://localhost:5000/api/receipts", payload);

      if (res.status === 201) {
        alert("✅ Receipt uploaded successfully!");
      }
    } catch (err) {
      console.error("❌ Error uploading receipt:", err);
      alert("Failed to upload receipt. Check console for details.");
    }
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

              <Table.Row>
                <Table.Cell fontWeight="bold">Category</Table.Cell>
                <Table.Cell>
                  <SelectRoot
                    name="category"
                    collection={categories}
                    value={[form.category]}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, category: value[0] || "Other" }))
                    }
                  >
                    <Select.HiddenSelect />
                    <SelectControl>
                      <SelectTrigger>
                        <SelectValueText placeholder="Select category" />
                      </SelectTrigger>
                      <SelectIndicatorGroup>
                        <SelectIndicator />
                      </SelectIndicatorGroup>
                    </SelectControl>
                    <Portal>
                      <SelectPositioner>
                        <SelectContent>
                          {categories.items.map((cat) => (
                            <SelectItem key={cat.value} item={cat}>
                              {cat.label}
                              <Select.ItemIndicator />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectPositioner>
                    </Portal>
                  </SelectRoot>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell fontWeight="bold">Total</Table.Cell>
                <Table.Cell>
                  <Input
                    size="sm"
                    name="totalPayment"
                    value={form.totalPayment}
                    onChange={handleChange}
                  />
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell fontWeight="bold">Payment Method</Table.Cell>
                <Table.Cell>
                  <SelectRoot
                    name="paymentMethod"
                    collection={paymentMethods}
                    value={[form.paymentMethod]}
                    onValueChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        paymentMethod: value[0] || "Other",
                      }))
                    }
                  >
                    <Select.HiddenSelect />
                    <SelectControl>
                      <SelectTrigger>
                        <SelectValueText placeholder="Select method" />
                      </SelectTrigger>
                      <SelectIndicatorGroup>
                        <SelectIndicator />
                      </SelectIndicatorGroup>
                    </SelectControl>
                    <Portal>
                      <SelectPositioner>
                        <SelectContent>
                          {paymentMethods.items.map((method) => (
                            <SelectItem key={method.value} item={method}>
                              {method.label}
                              <Select.ItemIndicator />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectPositioner>
                    </Portal>
                  </SelectRoot>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>

          <Box mt={6}>
            <Heading size="md" mb={3}>Line Items</Heading>
            <Button
              size="sm"
              colorScheme="green"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  line_items: [...prev.line_items, { item: "", price: "" }],
                }))
              }
              mb={2}
            >
              + Add Line Item
            </Button>
            <Table.Root size="sm" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Item</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
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
                    <Table.Cell textAlign="center">
                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => {
                          const updated = [...form.line_items];
                          updated.splice(index, 1);
                          setForm((prev) => ({
                            ...prev,
                            line_items:
                              updated.length > 0 ? updated : [{ item: "", price: "" }],
                          }));
                        }}
                      >
                        Remove
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
      )}

      <Button mt={8} colorScheme="blue" onClick={handleSubmit}>
        Submit Receipt
      </Button>
    </Box>
  );
}

export default AddExpense;