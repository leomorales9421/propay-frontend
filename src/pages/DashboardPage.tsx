import {
  Box,
  Flex,
  Text,
  VStack,
  Link,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import {
  FiTrendingUp,
  FiSettings,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logoPay.png";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const NavItem = ({ icon, children, path }) => (
    <Link
      display="flex"
      alignItems="center"
      w="100%"
      px="3"
      py="2"
      borderRadius="md"
      fontWeight="medium"
      fontSize="sm"
      color="white"
      _hover={{
        textDecoration: "none",
        bg: "teal.600",
      }}
      onClick={() => navigate(path)}
    >
      <Icon as={icon} mr={isOpen ? "2" : "0"} fontSize="16px" />
      {isOpen && <Text>{children}</Text>}
    </Link>
  );

  return (
    <Flex
      w={isOpen ? "220px" : "70px"}
      h="100vh"
      direction="column"
      bg="rgb(113, 125, 126, 1)" // Adjusted background color
      transition="width 0.3s"
      position="relative"
      overflowX="hidden" // Prevent horizontal scrollbar
    >
      {/* Toggle button */}
      <IconButton
        aria-label="Toggle Menu"
        size="md"
        variant="unstyled" //Removes the background
        color="white"
        position="absolute"
        top="10px"
        right={isOpen ? "-14px" : "-14px"}
        _hover={{ bg: "rgba(0, 0, 0, 0.2)" }} // Darken on hover
        _active={{ bg: "rgba(0, 0, 0, 0.3)" }} // Darken more when active
        onClick={() => setIsOpen(!isOpen)}
        zIndex="1"
      >
        {isOpen ? (
          <FiChevronLeft size="1.25em" />
        ) : (
          <FiChevronRight size="1.25em" />
        )}
      </IconButton>

      {/* Logo */}
      <Box
        p="2"
        mx="auto"
        mb={6}
        w={isOpen ? "80%" : "40px"}
        transition="all 0.3s"
        textAlign="center"
      >
        <img
          src={Logo}
          alt="PayMock Logo"
          style={{ width: isOpen ? "250px" : "30px", margin: "0 auto" }}
        />
      </Box>

      {/* Menu */}
      <VStack align="start" spacing={1} px="4">
        <NavItem icon={FiTrendingUp} path="/transactions">
          Transacciones
        </NavItem>
        <NavItem icon={FiSettings} path="/settings">
          Ajustes
        </NavItem>
        <NavItem icon={FiUser} path="/profile">
          Perfil
        </NavItem>
      </VStack>
    </Flex>
  );
}
