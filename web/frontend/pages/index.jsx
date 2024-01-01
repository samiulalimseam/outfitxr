import {
  Box,
  Button,
  Badge,
  Text,
  Card,
  Flex,
  Stack,
  HStack,
  VStack,
  Image,
  Heading,
} from "@chakra-ui/react";
import { GetStartedIMG } from "../assets/getStartedImg";

const HomePage = () => {
  return (
    <Box w={"60%"} mx={'auto'} p="4">
      <Flex w={'auto'}  direction={"column"}>
       
          <Flex  direction={'column'} gap={4}>
            <Text fontWeight={600} fontSize={"x-large"}>
              Get Started with OutfitXr
            </Text>
            <Text fontWeight={400} fontSize={"md"}>
            Use this guide to get you vitrual try-on experience up and running.            </Text>
            <Box w={'full'}>
            <GetStartedIMG />
            </Box>
          </Flex>
       
      </Flex>
    </Box>
  );
};

export default HomePage;
