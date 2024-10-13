"use client";
import { BgButton, FlexBox, OverView, TextInput } from "@/components";
import LeftSection from "@/components/links-page/components/LeftSection";
import { formFields, profileOverView } from "@/lib/config/data";
import { Box, Grid, GridItem, GridProps } from "@chakra-ui/react";
import { FC, useState } from "react";
import ImageForm from "./components/ImageForm";

type ProfileDetailsProps = GridProps & {};

const ProfileDetails: FC<ProfileDetailsProps> = ({ ...props }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
        {/* Left Part Content */}
        <LeftSection />
      </GridItem>
      <GridItem colSpan={{ base: 5, lg: 3 }} w="100%">
        <Box mb="3rem">
          <OverView data={profileOverView} />
        </Box>

        <form>
          <ImageForm label="Profile Picture" />
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
              placeholder={item?.placeholder}
              mb="16px"
            />
          ))}
        </form>
        <FlexBox
          justifyContent="flex-end"
          mt="2rem"
          // borderTop={`1px solid ${colors.borderColor}`}
          py="24px"
        >
          <BgButton>Save</BgButton>
        </FlexBox>
      </GridItem>
    </Grid>
  );
};

export default ProfileDetails;
