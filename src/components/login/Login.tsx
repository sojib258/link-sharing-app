/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BgButton, LabelInput, TextNormal } from "@/components";
import { colors } from "@/lib";

import { login } from "@/store/slices/authSlice";
import { Box, Center } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ToastMessage from "../toastMsg/ToastMessage";

import { TOKEN_NAME, URL } from "@/lib/config/constants";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "./Container";
import GoRegister from "./GoRegister";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    eamilOrUserName: "",
    password: "",
  });

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.loggedIn
  );

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLoginData = async () => {
    try {
      setLoading(true);
      const responsePromise = axios.post(`${URL}/auth/local`, {
        identifier: formData.eamilOrUserName,
        password: formData.password,
      });

      toast.promise(responsePromise, {
        loading: "Trying to login...",
        success: "Login successfull!",
        error: (error: any) => {
          return `${error?.response?.data?.error?.message}`;
        },
      });

      const response = await responsePromise;

      Cookies.set(TOKEN_NAME, response?.data?.jwt, { expires: 7 });
      dispatch(
        login({ userId: response?.data?.user?.id, token: response.data.jwt })
      );

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("Error", error);
      if (error?.response?.data?.error?.status === 400) {
        setErrorMessage("Invalid Username or Password");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      return router.push("/links");
    }
  });

  return (
    <>
      <Center px={{ base: "1rem", md: "6.25rem" }}>
        <Container>
          <TextNormal fontSize="2.4rem" fontWeight="600" mb="2rem">
            Sign In
          </TextNormal>
          <form style={{ width: "100%" }} onSubmit={handleLoginData}>
            <LabelInput
              type="text"
              value={formData?.eamilOrUserName}
              fieldKey="eamilOrUserName"
              label="Username or Email"
              placeholder="John234"
              handleChange={handleInputChange}
              isRequired={true}
            />
            <LabelInput
              type="text"
              value={formData?.password}
              fieldKey="password"
              label="Enter your password"
              placeholder="12345678"
              handleChange={handleInputChange}
              isRequired={true}
            />
            <Box w="full" h="auto">
              <BgButton type="submit" w="full" bg={colors?.primary}>
                Log In
              </BgButton>
            </Box>
          </form>
          <GoRegister />
        </Container>
      </Center>
      <ToastMessage />
    </>
  );
};

export default Login;
