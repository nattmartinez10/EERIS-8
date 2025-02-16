import { Box, Button, Container, Flex, Heading, Input, Text } from "@chakra-ui/react";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "../components/ui/file-upload"

function AddExpense() {
  return (
    <Box p={8} textAlign="center">
      <Heading size="lg" paddingBottom={5}>Add a New Expense</Heading>
      <Box display="flex" justifyContent="center">
      <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={1} paddingBottom = {8}>
      <FileUploadDropzone
        label="Drag and drop here to upload image of receipt"
        description=".png, .jpg up to 5MB"
      />
      <FileUploadList />
      </FileUploadRoot>
      </Box>
      <form>
        <Flex gap={8} h={24}>
          <Text>Receipt Name</Text>
          <Input name="name" type="string" placeholder="Enter name"></Input>
          <Text>Receipt Phone</Text>
          <Input name="phone" type="tel" placeholder="(888) 888-8888"></Input>
        </Flex>
        <Flex gap={8} h={24}>
          <Text>Receipt Address</Text>
          <Input name="address" type="string" placeholder="johndoe@eeris8.com"></Input>
          <Text>Receipt Website</Text>
          <Input name="website" type="string"></Input>
        </Flex>
        <Flex gap={8} h={24}>
          <Text>Receipt Date</Text>
          <Input name="date" type="date"></Input>
          <Text>Receipt Items</Text>
          <Input name="item" type="string"></Input>
        </Flex>
        <Flex gap={8} h={24}>
          <Text>Total Payment</Text>
          <Input name="totalPayment" type="number"></Input>
          <Text>Payment Method</Text>
          <Input name="paymentMethod" type="string"></Input>
        </Flex>
      </form>
      <Button>Submit Receipt</Button>
    </Box>
  );
}

export default AddExpense;
