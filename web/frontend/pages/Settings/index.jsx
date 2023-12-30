import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  Stack,
  Divider,
  Flex,
  Button,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { BsCoin, BsInfoCircle } from "react-icons/bs";
import SsoPopup from "../../components/popup/SsoPopup";
import { useAppQuery } from "../../hooks/useAppQuery";

export default function index() {
const {data: shopData, isLoading : shopDataLoading } =     useAppQuery({url: '/api/shop',});



  return (
    <Box p={10} my={"20"}>
      <Flex direction={'column'} gap={10}>
        <HStack alignItems={"start"} gap={10}>
          <Box mt={2} w={"30%"}>
            <Text fontWeight={"bold"}>OutfitXR Content Management System</Text>
            <Text fontSize={"sm"} color={"gray"}>
              OutfitXR Content Management System Integration
            </Text>
          </Box>
          <Box w={"full"}>
            <Flex
              gap={2}
              direction={"column"}
              borderRadius={"md"}
              bg={"white"}
              p={4}
            >
              <Flex gap={6}>
                <Box w={"full"}>
                  <Text fontWeight={"bold"} color={"black"}>
                    OutfitXR Content Management System
                  </Text>
                  <Text color={"gray"}>No account connected</Text>
                </Box>
                {/* sso btn  */}
                <SsoPopup shop={shopData?.shop} shopDataLoading={shopDataLoading} />
              </Flex>
              <HStack borderRadius={"md"} bg={"blue.50"} p={4}>
                <Text fontSize={"sm"} fontWeight={600} color={"blue.600"}>
                  <BsInfoCircle
                    style={{ margin: "0 10px 0 0 ", display: "inline-block" }}
                  />
                  Connecting to the CMS opens a popup window that might be
                  blocked by the browser. Please check your pop-up blocker if
                  you dont see it.
                </Text>
              </HStack>
            </Flex>
          </Box>
        </HStack>
        <HStack className="auto-renew-credits" alignItems={"start"} gap={10}>
          <Box mt={2} w={"30%"}>
            <Text fontWeight={"bold"}>Auto-renew credits</Text>
            <Text fontSize={"sm"} color={"gray"}>
              Automatically receive new credits every month.
            </Text>
          </Box>
          <Box w={"100%"}>
            <Flex
              gap={6}
              direction={"column"}
              borderRadius={"md"}
              bg={"white"}
              p={4}
            >
              <Flex gap={6}>
                <Box w={"full"}>
                  <Text fontWeight={"bold"} color={"black"}>
                    Your Balance
                  </Text>
                  <Text color={"gray"}>
                    {" "}
                    <BsCoin style={{ display: "inline-block" }} /> 600{" "}
                  </Text>
                </Box>
              </Flex>
              <Divider />
              <Flex direction={'column'} borderRadius={"md"} bg={"blue.50"} p={4}>
                <Text fontWeight={'black'}>
                    Auto-renewal is disabled
                </Text>
                <Text fontSize={"sm"} fontWeight={600} color={"blue.600"}>
                  <BsInfoCircle
                    style={{ margin: "0 10px 0 0 ", display: "inline-block" }}
                  />
                  Enable auto-renewal to automatically receive new credits every month .
                </Text>
              </Flex>
            </Flex>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}
