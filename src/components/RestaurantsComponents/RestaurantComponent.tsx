import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "../ui/Sidebar";

export function RestaurantComponent() {
  return (
    <Flex height="100vh">
      <Sidebar />

      <Box flex="1" p="4" overflowY="auto" ml={{ base: 0, md: "220px" }}>
        <h1>Restaurants</h1>
      </Box>
    </Flex>
  );
}
