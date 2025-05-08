import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Image,
  Text,
  IconButton,
  Center,
  Field,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import {
  validationSchema,
  initialValues,
} from "./CreateRestaurantComponentData.data";
import { useFormik } from "formik";

import { toaster } from "@/components/ui/toaster";

export function CreateRestaurantComponent({ onAddRestaurant }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      try {
        console.log(formValue);
      } catch (error) {
        toaster.error({
          title: "Error",
          description: error.response.data
            ? error.response.data.message
            : "Hubo un error",
        });
      }
    },
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogoPreview(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
      formik.setFieldTouched("image", true);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Field.Root
            invalid={formik.touched.name && Boolean(formik.errors.name)}
          >
            <Input
              placeholder="Nombre"
              name="name"
              size="sm"
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <Field.ErrorText color="red.500" fontSize="sm" mt={1}>
                {formik.errors.name}
              </Field.ErrorText>
            )}
          </Field.Root>
          <Field.Root
            invalid={formik.touched.address && Boolean(formik.errors.address)}
          >
            <Input
              placeholder="Dirección"
              name="address"
              size="sm"
              onChange={(e) => formik.setFieldValue("address", e.target.value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <Field.ErrorText color="red.500" fontSize="sm" mt={1}>
                {formik.errors.address}
              </Field.ErrorText>
            )}
          </Field.Root>
        </HStack>
        <HStack>
          <Field.Root
            invalid={formik.touched.phone && Boolean(formik.errors.phone)}
          >
            <Input
              placeholder="Teléfono"
              name="phone"
              size="sm"
              onChange={(e) => formik.setFieldValue("phone", e.target.value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <Field.ErrorText color="red.500" fontSize="sm" mt={1}>
                {formik.errors.phone}
              </Field.ErrorText>
            )}
          </Field.Root>
          <Field.Root
            invalid={formik.touched.state && Boolean(formik.errors.state)}
          >
            <Input
              placeholder="Estado"
              name="state"
              size="sm"
              onChange={(e) => formik.setFieldValue("state", e.target.value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.state && formik.errors.state && (
              <Field.ErrorText color="red.500" fontSize="sm" mt={1}>
                {formik.errors.state}
              </Field.ErrorText>
            )}
          </Field.Root>
        </HStack>

        {/* Carga y vista previa de logo */}
        <Box>
          <Text fontSize="sm" mb={2} fontWeight="medium">
            Logo del restaurante
          </Text>
          <HStack align="start" spacing={4}>
            <label>
              <Field.Root
                invalid={formik.touched.image && Boolean(formik.errors.image)}
              >
                <Input
                  type="file"
                  accept="image/*"
                  display="none"
                  name="image"
                  onChange={handleFileChange}
                />
                {formik.touched.image && formik.errors.image && (
                  <Field.ErrorText color="red.500" fontSize="sm" mt={1}>
                    {formik.errors.image}
                  </Field.ErrorText>
                )}
              </Field.Root>
              <Button as="span" size="sm" colorScheme="gray" variant="outline">
                Seleccionar imagen
              </Button>
            </label>
          </HStack>
          {logoPreview && (
            <Center mt={4} position="relative">
              <Image
                src={logoPreview}
                alt="Logo preview"
                boxSize="150px"
                borderRadius="full"
                objectFit="cover"
                shadow="lg"
              />

              <IconButton
                size="sm"
                position="absolute"
                top="5px"
                right="5px"
                colorScheme="red"
                onClick={handleRemoveLogo}
                aria-label="Eliminar logo"
              >
                <MdClose />
              </IconButton>
            </Center>
          )}
        </Box>

        <Button
          onClick={formik.handleSubmit}
          loading={formik.isSubmitting}
          width="full"
          bg="teal.500"
          _hover={{ bg: "teal.600" }}
          _active={{ bg: "teal.700" }}
          color="white"
          size="xs"
        >
          Guardar
        </Button>
      </VStack>
    </Box>
  );
}
