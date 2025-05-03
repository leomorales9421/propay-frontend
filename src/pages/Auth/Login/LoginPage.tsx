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
  Image,
  Field,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginData.data";
import { IconButton } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { login as loginApi } from "../../../api/auth";
import { useAuth } from "@/auth/AuthContext";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginPage() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const res = await loginApi(formValue);
        if (res.success) {
          login(res.data.accessToken, res.data.user);
          toaster.success({
            title: "Inicio de sesión exitoso",
          });
          window.location.href = "/dashboard"; // Redirigir al dashboard
        }
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
      <GridItem w="100%" maxW="md">
        <Image
          src="/src/assets/logoPay.png"
          alt="Logo corporativo"
          maxW="350px"
          mx="auto"
          mb={2}
        />
        <Box
          bg="white"
          p={8}
          rounded="2xl"
          shadow="lg"
          textAlign="left"
          w="100%"
        >
          <Heading size="lg" mb={6} textAlign="center" color="gray.700">
            Iniciar sesión
          </Heading>
          <form>
            <VStack spacing={4}>
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
                invalid={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                <PasswordInput
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  size="xs"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
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
                Iniciar Sesión
              </Button>
              <IconButton
                bg="gray.100"
                color="gray.700"
                _hover={{ bg: "gray.200" }}
                w="full"
                aria-label="Iniciar sesión con Google"
                size="xs"
              >
                <FcGoogle /> Iniciar sesión con Google
              </IconButton>

              <Text fontSize="sm" color="gray.500" mt={4}>
                ¿No tienes una cuenta?{" "}
                <Link href="/register" color="blue.500">
                  Regístrate
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </GridItem>
    </Grid>
  );
}
