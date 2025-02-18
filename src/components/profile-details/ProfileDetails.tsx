"use client";
import { BgButton, OverView, TextInput } from "@/components";
import LeftSection from "@/components/links-page/components/LeftSection";
import { URL } from "@/lib/config/constants";
import { formFields, profileOverView } from "@/lib/config/data";
import { RootState } from "@/store";
import { useGetAllDevlinksQuery } from "@/store/services/devlinksApi";
import { Box, Grid, GridItem, GridProps, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorMsg from "./components/ErrorMsg";
import ImageForm from "./components/ImageForm";

type ProfileDetailsProps = GridProps & {};

const ProfileDetails: FC<ProfileDetailsProps> = ({ ...props }) => {
  const { userId, token } = useSelector((state: RootState) => state?.auth);
  const { data, isLoading } = useGetAllDevlinksQuery(
    { userId },
    { skip: !userId }
  );

  const [formData, setFormData] = useState({
    firstname: data?.firstname || "",
    lastname: data?.lastname || "",
    email: data?.email || "",
  });

  console.log("DATA", data);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reRender, setReRender] = useState(false);

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
      let previousImageId = data?.image?.id; // Store previous image ID (if any)

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

        console.log("ImageUploadResponse", uploadResponse);

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

      console.log("updateResponse", updateResponse);

      if (updateResponse.status === 200) {
        setError("");
        console.log("Profile updated successfully!");
        setReRender(true);
      } else {
        setError("Failed to update user information");
      }
    } catch (error) {
      console.error("Error", error);
      setError("Error saving profile");
    } finally {
      setLoading(false);
      console.log("Finally");
    }
  };

  useEffect(() => {
    if (reRender) {
      setReRender(false);
    }
  }, [reRender]);

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={2}
      {...props}
      px={{ base: "1rem", md: "6.25rem" }}
    >
      <GridItem
        display={{ base: "none", lg: "block" }}
        colSpan={2}
        w="100%"
        h="full"
      >
        {loading && <Text fontSize="3rem">Loading...</Text>}
        {/* Left Part Content */}
        <LeftSection isLoading={isLoading} data={data} />
      </GridItem>
      <GridItem colSpan={{ base: 5, lg: 3 }} w="100%">
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
          <Stack
            alignItems="flex-end"
            mt="2rem"
            // borderTop={`1px solid ${colors.borderColor}`}
            py="24px"
          >
            {error && <ErrorMsg error={error} />}
            <Box>
              <BgButton type="submit">Save</BgButton>
            </Box>
          </Stack>
        </form>
      </GridItem>
    </Grid>
  );
};

export default ProfileDetails;
