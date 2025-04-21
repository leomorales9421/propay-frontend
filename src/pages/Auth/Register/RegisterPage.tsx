import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  Portal,
  createListCollection,
  Select,
  Image,
  Field,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { PasswordInput } from "@/components/ui/password-input";
import ReactCountryFlag from "react-country-flag";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./RegisterData.data";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const countries = createListCollection({
    items: [
      { label: "Venezuela", value: "ve", code: "VE" },
      { label: "Brasil", value: "br", code: "BR" },
      { label: "Colombia", value: "co", code: "CO" },
      { label: "Argentina", value: "ar", code: "AR" },
      { label: "Perú", value: "pe", code: "PE" },
    ],
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await api.post("/users", formValue);
        console.log(response.data);
        if (response.data.success) {
          toaster.success({
            title: "Exito",
            description: response.data.message,
          });

          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
        console.log(response);
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

  return (
    <Grid
      minH="100vh"
      placeItems="center"
      bgGradient="linear-gradient(to right, {colors.gray.100}, {colors.gray.300})"
      px={4}
    >
      <GridItem maxH="100px">
        <Image
          src="/src/assets/logoPay.png"
          alt="Logo corporativo"
          maxW="250px"
          mx="auto"
        />
      </GridItem>
      <GridItem w="100%" maxW="md">
        <Box
          bg="white"
          p={8}
          rounded="2xl"
          shadow="lg"
          textAlign="left"
          w="100%"
        >
          <Heading size="lg" mb={6} textAlign="center" color="gray.700">
            Registrarse
          </Heading>
          <form>
            <VStack spacing={4} align="stretch">
              <Field.Root
                invalid={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
              >
                <Input
                  name="firstName"
                  placeholder="Nombre"
                  size="xs"
                  onChange={(e) =>
                    formik.setFieldValue("firstName", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <Field.ErrorText>{formik.errors.firstName}</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root
                invalid={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
              >
                <Input
                  name="lastName"
                  placeholder="Apellido"
                  size="xs"
                  onChange={(e) =>
                    formik.setFieldValue("lastName", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <Field.ErrorText>{formik.errors.lastName}</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root
                invalid={formik.touched.email && Boolean(formik.errors.email)}
              >
                <Input
                  name="email"
                  placeholder="Correo electrónico"
                  size="xs"
                  onChange={(e) =>
                    formik.setFieldValue("email", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root
                invalid={formik.touched.phone && Boolean(formik.errors.phone)}
              >
                <Input
                  name="phone"
                  placeholder="Teléfono"
                  size="xs"
                  onChange={(e) =>
                    formik.setFieldValue("phone", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <Field.ErrorText>{formik.errors.phone}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root
                invalid={
                  formik.touched.country && Boolean(formik.errors.country)
                }
              >
                <Select.Root
                  collection={countries}
                  size="xs"
                  onValueChange={(e) => {
                    const value = Array.isArray(e.value) ? e.value[0] : e.value;
                    formik.setFieldValue("country", value);
                  }}
                >
                  <Select.HiddenSelect name="country" />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Selecciona un país" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {countries.items.map((country) => (
                          <Select.Item key={country.value} item={country}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <ReactCountryFlag
                                countryCode={country.code}
                                svg
                                style={{ width: "1.5em", height: "1.5em" }}
                                title={country.label}
                              />
                              <Text>{country.label}</Text>
                            </Box>
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
                {formik.touched.country && formik.errors.country && (
                  <Field.ErrorText>{formik.errors.country}</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root
                invalid={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                <PasswordInput
                  name="password"
                  placeholder="Contraseña"
                  size="xs"
                  onChange={(e) =>
                    formik.setFieldValue("password", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root
                invalid={
                  formik.touched.repeatPassword &&
                  Boolean(formik.errors.repeatPassword)
                }
              >
                <PasswordInput
                  name="repeatPassword"
                  placeholder="Repetir Contraseña"
                  size="xs"
                  onChange={(e) =>
                    formik.setFieldValue("repeatPassword", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.repeatPassword &&
                  formik.errors.repeatPassword && (
                    <Field.ErrorText>
                      {formik.errors.repeatPassword}
                    </Field.ErrorText>
                  )}
              </Field.Root>

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
                Registrarse
              </Button>

              <Text fontSize="sm" color="gray.500" mt={4} textAlign="center">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" color="blue.500">
                  Iniciar sesión
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </GridItem>
    </Grid>
  );
}
