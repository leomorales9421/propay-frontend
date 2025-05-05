import React, { useState, useCallback, useRef } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const centerDefault = {
  lat: -16.5, // ejemplo de latitud por defecto
  lng: -68.15, // ejemplo de longitud por defecto
};

export function CreateRestaurantComponent({ onAddRestaurant }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location: "",
    status: "",
    logo: null,
    coordinates: null, // para guardar coordenadas
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAGTn0yfAKNbbOu5E4SehP9VXC_FvytAEA", // Reemplaza con tu API key
    libraries: ["places"],
  });

  const autocompleteRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleMapClick = useCallback(
    (event) => {
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setFormData({ ...formData, coordinates: location });
    },
    [formData]
  );

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setFormData({
          ...formData,
          location: place.formatted_address,
          coordinates: location,
        });
      }
    }
  };

  const handleSubmit = () => {
    onAddRestaurant(formData);
    setFormData({
      name: "",
      address: "",
      location: "",
      status: "",
      logo: null,
      coordinates: null,
    });
    setLogoPreview(null);
  };

  if (!isLoaded) return <Spinner />;

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Input
            placeholder="Nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            size="sm"
          />
          <Input
            placeholder="Dirección"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            size="sm"
          />
        </HStack>
        <HStack>
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
          >
            <Input
              placeholder="Ubicación (Google Maps)"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              size="sm"
            />
          </Autocomplete>
          <Input
            placeholder="Estado"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            size="sm"
          />
        </HStack>

        {/* Carga y vista previa de logo */}
        <Box>
          <Text fontSize="sm" mb={2} fontWeight="medium">
            Logo del restaurante
          </Text>
          <HStack align="start">
            <label>
              <Input
                type="file"
                accept="image/*"
                display="none"
                onChange={handleFileChange}
              />
              <Button as="span" size="sm" colorScheme="gray" variant="outline">
                Seleccionar imagen
              </Button>
            </label>
            {logoPreview && (
              <Image
                src={logoPreview}
                alt="Logo preview"
                boxSize="60px"
                borderRadius="md"
                objectFit="cover"
                shadow="sm"
              />
            )}
          </HStack>
        </Box>

        {/* Mapa de Google */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Selecciona la ubicación en el mapa
          </Text>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={formData.coordinates || centerDefault}
            zoom={14}
            onClick={handleMapClick}
          >
            {formData.coordinates && <Marker position={formData.coordinates} />}
          </GoogleMap>
        </Box>

        <Button
          bg="teal.500"
          _hover={{ bg: "teal.600" }}
          _active={{ bg: "teal.700" }}
          color="white"
          size="sm"
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </VStack>
    </Box>
  );
}
