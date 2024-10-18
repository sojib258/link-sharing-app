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
type ImageFormProps = FormControlProps & {
  isRequired?: boolean;
  label?: string;
  imagePreview: string | null;
  handleImageChange: (file: File) => void;
};

const styleOne = {
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
};

const labelChangePicture = {
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
};

const labelUploadPicture = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  background: "rgba(0, 0, 0, 0.3)",
};

const ImageForm: FC<ImageFormProps> = ({
  isRequired,
  label,
  imagePreview,
  handleImageChange,
  ...props
}) => {
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

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
        <PreviewImageContainer>
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
