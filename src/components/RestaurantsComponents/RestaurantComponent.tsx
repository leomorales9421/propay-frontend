import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  Icon,
  Portal,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { Sidebar } from "../ui/Sidebar";
import { CreateRestaurantComponent } from "./CreateRestaurantComponent";
import { Dialog, Table } from "@chakra-ui/react";
import { MdAdd, MdClose } from "react-icons/md";

export function RestaurantComponent() {
  const [restaurants, setRestaurants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddRestaurant = (newRestaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
    setIsModalOpen(false);
  };

  return (
    <Flex height="100vh">
      <Sidebar />

      <Box flex="1" p={{ base: 4, md: 8 }} overflowY="auto" bg="gray.50">
        <Flex justify="space-between" align="center">
          <Heading as="h2" size="lg" mb={6}>
            Gestión de Restaurantes
          </Heading>
        </Flex>
        <Button
          onClick={() => setIsModalOpen(true)}
          bg="teal.500"
          _hover={{ bg: "teal.600" }}
          _active={{ bg: "teal.700" }}
          color="white"
          size="xs"
          mb={4}
        >
          <Icon as={MdAdd} boxSize={4} mr={2} />
          <Text fontSize="sm">Agregar Restaurante</Text>
        </Button>

        <Dialog.Root open={isModalOpen} size="lg">
          <Dialog.Trigger asChild>
            <Box display="none" />
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop bg="blackAlpha.300" />
            <Dialog.Positioner>
              <Dialog.Content
                borderRadius="xl"
                boxShadow="xl"
                bg="white"
                width="100%"
                maxW="lg"
                px={0}
                py={0}
              >
                <Dialog.Header
                  px={6}
                  pt={6}
                  pb={2}
                  borderBottom="1px solid"
                  borderColor="gray.100"
                >
                  <Dialog.Title fontSize="md" fontWeight="bold">
                    Agregar Restaurante
                  </Dialog.Title>
                </Dialog.Header>

                <Dialog.Body px={6} py={4}>
                  <CreateRestaurantComponent
                    onAddRestaurant={handleAddRestaurant}
                  />
                </Dialog.Body>

                <Dialog.Footer
                  px={6}
                  pt={0}
                  pb={6}
                  display="flex"
                  justifyContent="flex-end"
                  borderTop="1px solid"
                  borderColor="gray.100"
                >
                  <Dialog.CloseTrigger asChild>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <MdClose />
                    </IconButton>
                  </Dialog.CloseTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>

        <Box bg="white" boxShadow="md" borderRadius="lg" p={4}>
          <Table.Root size="sm" variant="outline">
            <Table.ColumnGroup>
              <Table.Column htmlWidth="25%" />
              <Table.Column htmlWidth="25%" />
              <Table.Column htmlWidth="25%" />
              <Table.Column htmlWidth="15%" />
              <Table.Column htmlWidth="10%" />
            </Table.ColumnGroup>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                <Table.ColumnHeader>Dirección</Table.ColumnHeader>
                <Table.ColumnHeader>Ubicación</Table.ColumnHeader>
                <Table.ColumnHeader>Estado</Table.ColumnHeader>
                <Table.ColumnHeader>Logo</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {restaurants.map((restaurant, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{restaurant.name}</Table.Cell>
                  <Table.Cell>{restaurant.address}</Table.Cell>
                  <Table.Cell>{restaurant.location}</Table.Cell>
                  <Table.Cell>{restaurant.status}</Table.Cell>
                  <Table.Cell>
                    {restaurant.logo ? restaurant.logo.name : ""}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </Flex>
  );
}
