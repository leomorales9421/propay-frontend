import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Text,
} from "@chakra-ui/react";
import { Sidebar } from "../ui/Sidebar";
import { MdAdd } from "react-icons/md";

export function UsersComponents() {
  const [users, setUsers] = useState([]);
  return (
    <Flex height="100vh">
      <Sidebar />

      <Box flex="1" p={{ base: 4, md: 8 }} overflowY="auto" bg="gray.50">
        <Flex justify="space-between" align="center">
          <Heading as="h2" size="lg" mb={6}>
            Usuarios
          </Heading>
        </Flex>
        <Button
          bg="teal.500"
          _hover={{ bg: "teal.600" }}
          _active={{ bg: "teal.700" }}
          color="white"
          size="xs"
          mb={4}
        >
          <Icon as={MdAdd} boxSize={4} mr={2} />
          <Text fontSize="sm">Agregar Usuario</Text>
        </Button>

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
                <Table.ColumnHeader>Apellido</Table.ColumnHeader>
                <Table.ColumnHeader>Cédula</Table.ColumnHeader>
                <Table.ColumnHeader>Telefono</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Acciones</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.last_name}</Table.Cell>
                  <Table.Cell>{user.dni}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </Flex>
  );
}
