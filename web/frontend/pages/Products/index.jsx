import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
  Td,
  Input,
  Flex,
  Text,
  Box,
  useToast
} from '@chakra-ui/react';
import productsData from '../../assets/products'
const index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const toast = useToast()
const products = productsData?.products
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === '' || product.status === filterStatus)
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={4}>
        Snowboard Products
      </Text>
      <Text mb={4}>
        This table displays various snowboard products available in the store.
      </Text>
      <Flex mb={4}>
        <Input
          placeholder="Search by product name"
          value={searchTerm}
          onChange={handleSearchChange}
          mr={4}
        />
        <Input
          placeholder="Filter by status"
          value={filterStatus}
          onChange={handleFilterChange}
        />
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Status</Th>
            <Th>Image</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredProducts.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.status}</Td>
              <Td>
                <img
                  src={product.images.length > 0 ? product.images[0].src : ''}
                  alt={product.name}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </Td>
              <Td>
                <Button isLoading={btnLoading} onClick={()=> {
                  setBtnLoading(true)
                  setTimeout(() => {
                    toast({
                      type: 'error',
                      title: 'Error Occured'
                    })
                    setBtnLoading(false)
                  }, 3000);
                }} colorScheme={'whatsapp'} fontWeight={400} size={'sm'} >Create Virtual Garment</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default index;
