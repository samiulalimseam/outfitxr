import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  TableCaption,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Link,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  ListItem,
  Select,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import productsData from "../../assets/products";
import { useAppQuery } from "../../hooks/useAppQuery";
import ProductTable from "../../components/productsComp";
const index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const toast = useToast();
  const {data: fetchedProd} = useAppQuery({url: '/api/products'}) 
  const products = fetchedProd?.body?.data?.products?.nodes
 

  console.log('fetchedProd-', fetchedProd)



  const handleSync = () => {
    // Functionality to sync products goes here
    // This function will be executed when the "Sync Products" button is clicked
    console.log("Syncing products...");
  };

  return (
    <Box w={"full"} p={6}>
      <Flex w={"70%"} mx={"auto"} direction={"column"} gap={10}>
        <Card
          borderRadius={"lg"}
          display={"flex"}
          flexDir={"column"}
          gap={4}
          p={4}
        >
          <Text fontWeight={600} fontSize={"14px"}>
            Your Balance
          </Text>
          <Text fontSize={"24px"} fontWeight={700}>
            {`50 `} credits
          </Text>
          <Box mx={4}>
            <Divider />
          </Box>
          <Flex justifyContent={"space-between"} gap={4}>
            <Box>
              <Text fontWeight={600} fontSize={"14px"}>
                Auto-renewal is disabled
              </Text>
              <Text fontWeight={400} size={"13px"} color={"#616161"}>
                Enable auto-renewal to automatically receive new credits every
                month.
              </Text>
            </Box>
            <Button
              _hover={{ bg: "green" }}
              size={"sm"}
              bg={"#303030"}
              color={"white"}
            >
              Manage Credits
            </Button>
          </Flex>
        </Card>

        <Card
          borderRadius={"lg"}
          display={"flex"}
          flexDir={"column"}
          gap={4}
          p={4}
        >
          <Text fontWeight={600} fontSize={"14px"}>
            Mode
          </Text>
          <Select>
            <option value="1">{`Test (Free)`}</option>
            <option value="2">Cloud</option>
            <option value="3">Offline</option>
          </Select>
          <Box mx={4}>
            <UnorderedList>
              <ListItem fontSize={"14px"} fontWeight={450}>
                Running in TEST has no cost and will work in a queue matter.
              </ListItem>
              <ListItem fontSize={"14px"} fontWeight={450}>
                Cloud mode will work in AWS Cloud. In case AWS has no available
                resources fitting room will be disabled and your credits will
                not be deducted.
              </ListItem>
            </UnorderedList>
          </Box>
          <Button
            fontWeight={450}
            fontSize={"14px"}
            w={"80px"}
            border={"1px solid lightGray"}
            size={"sm"}
          >
            Apply
          </Button>
        </Card>
        <Card display={'flex'} flexDir={'column'} gap={4} borderRadius={"lg"} p={4}>
          <Flex px={5} justifyContent={"space-between"} gap={4}>
            <Box w={"80%"} fontWeight={600} fontSize={"14px"}>
              Products
            </Box>
            <Flex justifyContent={'end'} gap={2} w={"20%"}>
              <Button fontWeight={400} px={4} size={"sm"} onClick={handleSync}>
                Sync
              </Button>
              <Input
                type="hidden"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={4}
              />
              <Button size={"sm"}>
                <SearchIcon />
              </Button>
            </Flex>
          </Flex>
          <Divider color={'gray.200'} />
          <ProductTable products={products} />
        </Card>
      </Flex>
    </Box>
  );
};

export default index;
