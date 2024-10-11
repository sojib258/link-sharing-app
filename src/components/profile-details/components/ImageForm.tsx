import { Icon, TextNormal } from "@/components/utils";
import { colors } from "@/lib";
import {
  Box,
  FormControl,
  FormControlProps,
  FormLabel,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
type ImageFormProps = FormControlProps & {
  isRequired?: boolean;
  label?: string;
};

const ImageForm: FC<ImageFormProps> = ({ isRequired, label, ...props }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Display the image in UI
      };
      reader.readAsDataURL(file); // Convert image to data URL for preview
    }
  };

  //   // Handle form submission
  //   const handleSave = async () => {
  //     if (!selectedImage) return;

  //     // Create a form data object to send the image to the backend
  //     const formData = new FormData();
  //     formData.append("profileImage", selectedImage);

  //     // Send form data to backend API (replace with your actual API endpoint)
  //     const response = await fetch("/api/uploadProfileImage", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log("Image saved successfully!");
  //       // Handle successful save (e.g., show success message)
  //     } else {
  //       console.log("Failed to save image");
  //       // Handle error during save (e.g., show error message)
  //     }
  //   };

  return (
    <>
      <FormControl
        isRequired={isRequired}
        display="flex"
        alignItems="center"
        mb="16px"
        {...props}
      >
        <FormLabel minW="10rem">{label}</FormLabel>
        {/* <Box bg="red" textAlign="center"> */}
        <Box
          position="relative"
          w="150px"
          h="150px"
          //   mx="auto"
          borderRadius="1.5rem"
          overflow="hidden"
          bg={colors?.lightPrimary}
        >
          {imagePreview ? (
            <>
              <Image
                src={imagePreview}
                alt="Profile Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <label
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, 0.3)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <Stack h="full" justifyContent="center" alignItems="center">
                  <Icon size={24} name="upload" color={colors?.white} />
                  <TextNormal fontSize=".85rem" color={colors?.white}>
                    Change Picture
                  </TextNormal>
                </Stack>
                <Input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
            </>
          ) : (
            <label
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Stack h="full" justifyContent="center" alignItems="center">
                <Icon size={24} name="upload" />
                <TextNormal fontSize=".85rem">Upload Picture</TextNormal>
              </Stack>
              <Input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </label>
          )}
          {/* Input to select the image */}
        </Box>
      </FormControl>
    </>
  );
};

export default ImageForm;
