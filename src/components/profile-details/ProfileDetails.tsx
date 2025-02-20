"use client";
import { BgButton, OverView, TextInput } from "@/components";
import LeftSection from "@/components/links-page/components/LeftSection";
import { colors } from "@/lib";
import { URL } from "@/lib/config/constants";
import { formFields, profileOverView } from "@/lib/config/data";
import { RootState } from "@/store";
import { useGetAllDevlinksQuery } from "@/store/services/devlinksApi";
import { logout } from "@/store/slices/authSlice";
import { Box, Flex, Grid, GridItem, GridProps, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsg from "./components/ErrorMsg";
import ImageForm from "./components/ImageForm";

type ProfileDetailsProps = GridProps & {};

const ProfileDetails: FC<ProfileDetailsProps> = ({ ...props }) => {
  const { userId, token, loggedIn } = useSelector(
    (state: RootState) => state?.auth
  );
  const dispatch = useDispatch();
  const { data, refetch, isFetching, isLoading } = useGetAllDevlinksQuery(
    { userId },
    { skip: !userId }
  );

  const [formData, setFormData] = useState({
    firstname: data?.firstname || "",
    lastname: data?.lastname || "",
    email: data?.email || "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    setError("");
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      // Check if firstname and lastname are empty
      if (formData?.firstname === "" && formData?.lastname === "") {
        setError("First name and last name are required");
        return;
      }

      // Prepare body data for user information update
      const bodyData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData?.email || data?.email, // Use existing email if not provided
      };

      let uploadedImageId = null; // Store new image ID (if any)
      const previousImageId = data?.image?.id; // Store previous image ID (if any)

      // Step 1: Handle image upload if a new image is selected
      if (selectedImage) {
        // If there's an existing image, delete it first
        if (previousImageId) {
          await axios.delete(`${URL}/upload/files/${previousImageId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        // Prepare form data for image upload
        const formDataObj = new FormData();
        formDataObj.append("files", selectedImage);

        // Upload the new image to Strapi
        const uploadResponse = await axios.post(`${URL}/upload`, formDataObj, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadResponse.status === 201 && uploadResponse.data.length > 0) {
          uploadedImageId = uploadResponse.data[0].id; // Get the uploaded image ID
        } else {
          setError("Image upload failed");
          return;
        }
      }

      const updatedUser = {
        ...bodyData,
        image: uploadedImageId || previousImageId, // Use uploaded image if available, otherwise keep the previous one
      };

      // Send the updated user data to Strapi
      const updateResponse = await axios.put(
        `${URL}/users/${userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (updateResponse.status === 200) {
        setError("");
        await refetch();
      } else {
        setError("Failed to update user information");
      }
    } catch (error) {
      console.error("Error", error);
      setError("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!loggedIn) {
      return router.push("/login");
    }
  }, [loggedIn]);

  return (
    <Box pb="3rem">
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
        gap={2}
        {...props}
        px={{ base: "1rem", md: "6.25rem" }}
      >
        <GridItem
          colSpan={{ base: 1, lg: 2 }}
          w="100%"
          h="full"
          order={{ base: 2, lg: 1 }}
        >
          <LeftSection isLoading={isLoading || isFetching} data={data} />
        </GridItem>
        <GridItem
          colSpan={{ base: 1, lg: 3 }}
          w="100%"
          order={{ base: 1, lg: 2 }}
        >
          <Box mb="3rem">
            <OverView data={profileOverView} />
          </Box>

          <form onSubmit={handleSave}>
            <ImageForm
              label="Profile Picture"
              imagePreview={imagePreview}
              handleImageChange={handleImageChange}
              defaultImage={data?.image?.url}
            />
            {formFields?.map((item, i) => (
              <TextInput
                key={i}
                fieldKey={item.fieldKey}
                name={item.name}
                type={item.type}
                value={formData[item.fieldKey as keyof typeof formData]}
                handleChange={(key, value) =>
                  handleInputChange(key as keyof typeof formData, value)
                }
                label={item?.label}
                isRequired={item?.isRequired}
                placeholder={data?.[item.fieldKey] || item?.placeholder}
                mb="16px"
              />
            ))}
            <Stack alignItems="flex-end" mt="2rem" py="24px">
              {error && <ErrorMsg error={error} />}
              <Flex gap={4}>
                <BgButton
                  disabled={loading || isFetching}
                  isLoading={isLoading || isFetching}
                  onClick={handleLogout}
                  bg={colors?.white}
                  border={`2px solid ${colors?.primary}`}
                  color={colors?.primary}
                  _hover={{
                    bg: colors?.primary,
                    color: colors?.white,
                  }}
                >
                  Log Out
                </BgButton>
                <BgButton
                  disabled={loading || isFetching}
                  isLoading={isLoading || isFetching}
                  type="submit"
                >
                  Save
                </BgButton>
              </Flex>
            </Stack>
          </form>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProfileDetails;
