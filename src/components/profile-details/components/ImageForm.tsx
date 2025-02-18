import { colors } from "@/lib";
import {
  FormControl,
  FormControlProps,
  FormLabel,
  Image,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";
import ImageOverlay from "./ImageOverlay";
import PreviewImageContainer from "./PreviewImageContainer";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
type ImageFormProps = FormControlProps & {
  isRequired?: boolean;
  label?: string;
  imagePreview: string | null;
  defaultImage?: string | null;
  handleImageChange: (file: File) => void;
};

const labelChangePicture = {
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: colors?.lightWhite,
  color: "white",
  cursor: "pointer",
};

const labelUploadPicture = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  background: colors?.lightWhite,
};

const ImageForm: FC<ImageFormProps> = ({
  isRequired,
  label,
  imagePreview,
  defaultImage,
  handleImageChange,
  ...props
}) => {
  const displayImage = imagePreview || defaultImage;

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  console.log("displayImage", displayImage);
  return (
    <>
      <FormControl
        isRequired={isRequired}
        display="flex"
        alignItems="center"
        mb="16px"
        {...props}
      >
        <FormLabel minW={{ base: "7rem", sm: "10rem" }}>{label}</FormLabel>
        {/* <Box bg="red" textAlign="center"> */}
        <PreviewImageContainer>
          {displayImage ? (
            <>
              <Image
                src={
                  imagePreview ? displayImage : `${BACKEND_URL}/${displayImage}`
                }
                alt="Profile Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <label
                style={{
                  position: "absolute",
                  ...labelChangePicture,
                }}
              >
                <ImageOverlay label="Change Picture" />
                <Input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onImageChange}
                />
              </label>
            </>
          ) : (
            <label style={labelUploadPicture}>
              <ImageOverlay label="Upload Picture" />
              <Input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onImageChange}
              />
            </label>
          )}
          {/* Input to select the image */}
        </PreviewImageContainer>
      </FormControl>
    </>
  );
};

export default ImageForm;
