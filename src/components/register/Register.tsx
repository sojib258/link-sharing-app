/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BgButton, LabelInput, TextNormal } from "@/components";
import { colors } from "@/lib";
import { TOKEN_NAME, URL } from "@/lib/config/constants";
import { RootState } from "@/store";
import { login } from "@/store/slices/authSlice";
import { Box, Center } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.loggedIn
  );
  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
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
          success: "Register successfull!",
          error: (error: any) => {
            console.log("AAAA", error);
            return `${error?.response?.data?.error?.message}`;
          },
        });

        // Trying login after registration
        const responseData = await responsePromise;
        Cookies.set(TOKEN_NAME, responseData?.data?.jwt, { expires: 7 });
        dispatch(
          login({
            userId: responseData?.data?.user?.id,
            token: responseData.data.jwt,
          })
        );

        setLoading(false);
        router.push("/links");
      } catch (error: any) {
        setLoading(false);
        console.log("Errorrrrr", error);
        if (error?.response?.data?.error?.status === 400) {
          //   setErrorMsg(`${error?.}`);
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
      router.push("/links");
    }
  });

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
            <Box w="full" h="auto">
              <BgButton onClick={handleSubmit} w="full" bg={colors?.primary}>
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
