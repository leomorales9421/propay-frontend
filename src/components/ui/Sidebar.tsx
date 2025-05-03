import {
  Box,
  Flex,
  Text,
  VStack,
  Link,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdRestaurant, MdPeople, MdStarRate, MdHome } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logoPay.png";
import { useState } from "react";

export function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const NavItem = ({ icon, children, path }) => (
    <Link
      onClick={() => navigate(path)}
      display="flex"
      alignItems="center"
      gap="3"
      w="100%"
      px="3"
      py="2"
      borderRadius="md"
      fontWeight="medium"
      fontSize="sm"
      color="white"
      _hover={{
        textDecoration: "none",
        bg: "teal.500",
      }}
      transition="background 0.2s ease"
    >
      <Icon as={icon} fontSize="20px" />
      {isOpen && <Text>{children}</Text>}
    </Link>
  );

  return (
    <Flex
      w={isOpen ? "220px" : "70px"}
      h="100vh"
      direction="column"
      bg="#1a202c"
      transition="width 0.3s ease"
      boxShadow="xl"
      position="relative"
      overflowX="hidden"
      color="white"
    >
      {/* Toggle Button */}
      <IconButton
        aria-label="Toggle Menu"
        size="sm"
        position="absolute"
        top="50%"
        right={isOpen ? "-12px" : "-10px"}
        transform="translateY(-50%)"
        borderRadius="md"
        bg="whiteAlpha.200"
        color="white"
        backdropFilter="blur(6px)"
        _hover={{ bg: "whiteAlpha.300" }}
        _active={{ bg: "whiteAlpha.400" }}
        transition="all 0.3s ease"
        onClick={() => setIsOpen(!isOpen)}
        zIndex="10"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
      >
        {isOpen ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
      </IconButton>

      {/* Logo */}
      <Box
        pt="6"
        pb="2"
        px="2"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb="4"
      >
        <img
          src={Logo}
          alt="PayMock Logo"
          style={{
            width: isOpen ? "120px" : "30px",
            height: "auto",
            transition: "all 0.3s ease",
          }}
        />
      </Box>

      {/* Menu Items */}
      <VStack align="start" spacing={1} px="4">
        <Tooltip content="Início" disabled={isOpen}>
          <Box w="100%">
            <NavItem icon={MdHome} path="/dashboard">
              Inicio
            </NavItem>
          </Box>
        </Tooltip>
        <Tooltip content="Restaurantes" disabled={isOpen}>
          <Box w="100%">
            <NavItem icon={MdRestaurant} path="/restaurants">
              Restaurantes
            </NavItem>
          </Box>
        </Tooltip>
        <Tooltip
          content="Usuarios"
          positioning={{ offset: { mainAxis: 4, crossAxis: 4 } }}
          disabled={isOpen}
        >
          <Box w="100%">
            <NavItem icon={MdPeople} path="/users">
              Usuarios
            </NavItem>
          </Box>
        </Tooltip>
        <Tooltip
          content="Puntuaciones"
          positioning={{ offset: { mainAxis: 4, crossAxis: 4 } }}
          disabled={isOpen}
        >
          <Box w="100%">
            <NavItem icon={MdStarRate} path="/qualifications">
              Puntuaciones
            </NavItem>
          </Box>
        </Tooltip>
      </VStack>
    </Flex>
  );
}
