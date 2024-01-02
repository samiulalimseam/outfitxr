import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  ListItem,
  Select,
  Text,
  UnorderedList
} from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box w={"full"} p={6}>
      <Flex w={"70%"} mx={"auto"} direction={"column"} gap={10}>
        <Card borderRadius={'lg'} p={4}>
          <Text fontWeight={600} fontSize={"36px"}>
            Getting Started
          </Text>
          <Text fontWeight={450} fontSize={"13px"} color={"blue"}>
            <a target="blank" href="https://docs.outfitxr.io/">
              docs.outfitxr.io
            </a>
          </Text>
          <Text fontWeight={440} fontSize={"14px"}>
            Do you need any help? Contact us through email or Discord.
          </Text>
          <Text fontWeight={440} fontSize={"14px"}>
            Email: support@outfitxr.io
          </Text>
          <Text>
            Discord:{" "}
            <a style={{ color: "blue" }} href="">
              link
            </a>{" "}
          </Text>
        </Card>
        <Card borderRadius={'lg'} display={"flex"} flexDir={"column"} gap={4} p={4}>
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
        <Card borderRadius={'lg'} display={"flex"} flexDir={"column"} gap={4} p={4}>
          <Text fontWeight={600} fontSize={"14px"}>
            Your Balance
          </Text>
          <Text fontSize={"24px"} fontWeight={700}>
            {`50 `} credits
          </Text>
          <Box mx={4}>
            <Divider />
          </Box>
          <Flex justifyContent={'space-between'} gap={4}>
            <Box>
            <Text fontWeight={600} fontSize={"14px"}>Auto-renewal is disabled</Text>
          <Text fontWeight={400}  size={'13px'} color={'#616161'}>Enable auto-renewal to automatically receive new credits every month.</Text>
            </Box>
            <Button _hover={{bg:'green'}} size={'sm'} bg={'#303030'} color={"white"}>Manage Credits</Button>
          </Flex>
        </Card>
      </Flex>
    </Box>
  );
};

export default HomePage;
