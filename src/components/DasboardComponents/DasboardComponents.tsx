import React from "react";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { Sidebar } from "../ui/Sidebar";
import { TotalClientesChart } from "./TotalClientesChart";
import { TotalRestaurantsChart } from "./TotalRestaurantsChart";
import { TotalVendidoChart } from "./TotalVendidoChart";

export function DasboardComponents() {
  return (
    <Flex height="100vh">
      <Sidebar />

      <Box flex="1" p="6" overflowY="auto" ml={{ base: 0, md: "0px" }}>
        <Heading as="h2" size="lg" mb={6}>
          Dashboard
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
            <Heading size="md" mb={4}>
              Total Restaurantes
            </Heading>
            <TotalRestaurantsChart />
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
            <Heading size="md" mb={4}>
              Total Vendido (Bs)
            </Heading>
            <TotalVendidoChart />
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
            <Heading size="md" mb={4}>
              Total Clientes
            </Heading>
            <TotalClientesChart />
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
