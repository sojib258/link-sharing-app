/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BgButton, LabelInput, TextNormal } from "@/components";
import { colors } from "@/lib";
import { URL } from "@/lib/config/constants";
import { RootState } from "@/store";
import { login } from "@/store/slices/authSlice";
import { Alert, AlertIcon, Box, Center } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "../toastMsg/ToastMessage";
import Container from "./Container";
import GoLogin from "./GoLogin";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.loggedIn
  );
  const handleInputChange = (key: string, value: string) => {
    setErrorMsg("");
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData?.password === formData?.confirmPassword) {
      try {
        setLoading(true);
        setErrorMsg("");
        const responsePromise = axios.post(`${URL}/auth/local/register`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        toast.promise(responsePromise, {
          loading: "Trying to register...",
          success: "Registration successfull!",
          error: (error: any) => {
            console.log("AAAA", error);
            return `${
              error?.response?.data?.error?.message ||
              "Something went wrong! Try again"
            }`;
          },
        });

        // Trying login after registration
        const responseData = await responsePromise;
        dispatch(
          login({
            userId: responseData?.data?.user?.id,
            token: responseData?.data?.jwt,
            documentId: responseData?.data?.user?.documentId,
          })
        );

        setLoading(false);
        router.push("/links");
      } catch (error: any) {
        setLoading(false);
        console.log("error", error);
        if (error?.response?.data?.error?.message) {
          setErrorMsg(error?.response?.data?.error?.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMsg(`Your password did not matched!`);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  });

  // Workable Enter Button for Form Submit
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <>
      <Center px={{ base: "1rem", md: "6.25rem" }}>
        <Container>
          <TextNormal fontSize="2.4rem" fontWeight="600" mb="2rem">
            Sign Up
          </TextNormal>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <LabelInput
              type="text"
              value={formData?.username}
              fieldKey="username"
              label="Enter your username"
              placeholder="John234"
              handleChange={handleInputChange}
              isRequired={true}
            />
            <LabelInput
              type="text"
              value={formData?.email}
              fieldKey="email"
              label="Enter your email"
              placeholder="john@gmail.com"
              handleChange={handleInputChange}
              isRequired={true}
            />
            <LabelInput
              type="password"
              label="Password"
              fieldKey="password"
              placeholder="12345678"
              value={formData?.password}
              handleChange={handleInputChange}
              isRequired={true}
            />
            <LabelInput
              type="password"
              label="Confirm Password"
              fieldKey="confirmPassword"
              placeholder="12345678"
              value={formData?.confirmPassword}
              handleChange={handleInputChange}
              isRequired={true}
            />
            {errorMsg && (
              <Alert
                color={colors?.danger}
                bg="transparent"
                my=".4rem"
                status="error"
                p={0}
                mb="1rem"
              >
                <AlertIcon fontSize="8px" />
                {errorMsg}
              </Alert>
            )}
            <Box w="full" h="auto">
              <BgButton
                isLoading={loading}
                onClick={handleSubmit}
                w="full"
                bg={colors?.primary}
              >
                Register
              </BgButton>
            </Box>
          </form>
          <GoLogin />
        </Container>
      </Center>
      <ToastMessage />
    </>
  );
};

export default Register;
