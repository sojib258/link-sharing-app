import { CustomIcon, FlexBox, TextNormal } from "@/components";
import { colors } from "@/lib";
import { addedLinks } from "@/lib/config/data";
import { Box, Flex, Grid, GridItem, GridProps, Image } from "@chakra-ui/react";
import { FC } from "react";

type LinksPageProps = GridProps & {};

const LinksPage: FC<LinksPageProps> = ({ ...props }) => {
  const linksLength = addedLinks?.length > 6 ? true : false;

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6} {...props} px="100px">
      <GridItem
        display={{ base: "none", lg: "block" }}
        colSpan={2}
        w="100%"
        h="full"
      >
        <FlexBox
          h="80vh"
          w="400px"
          bg="url(/mockup/mockup2.png)"
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          position="relative"
        >
          <Box w="200px" h="auto" position="absolute" top="100px" left="100px">
            {/* Image Area */}
            <FlexBox justifyContent="center" w="full" h="auto" mb="18px">
              <Flex
                w="80px"
                h="80px"
                borderRadius="50%"
                border={`4px solid ${colors.primary}`}
              >
                <Image
                  borderRadius="50%"
                  w="full"
                  h="full"
                  objectFit="cover"
                  src="/user/userOne.jpeg"
                />
              </Flex>
            </FlexBox>

            {/* Personal Information Area */}
            <FlexBox flexDirection="column" alignItems="center" mb="2rem">
              <TextNormal fontSize=".875rem" fontWeight="600">
                Ben Wright
              </TextNormal>
              <TextNormal fontSize=".75rem" color={colors.menuTextColor}>
                ben@example.com
              </TextNormal>
            </FlexBox>

            {/* Added Links Card */}
            <FlexBox
              flexDir="column"
              alignItems="center"
              height="265px"
              overflowY={linksLength ? "scroll" : "hidden"}
            >
              {addedLinks.map((item, i) => (
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  p="8px 12px"
                  bg={item.cardColor}
                  mb="12px"
                  borderRadius="8px"
                >
                  <FlexBox h="full" alignItems="center">
                    <Box mr="4px">
                      <CustomIcon
                        size={14}
                        name={item?.platform}
                        color={item.iconColor}
                      />
                    </Box>
                    <TextNormal color={item.texxtColor} fontSize=".65rem">
                      {item?.label}
                    </TextNormal>
                  </FlexBox>
                  <Box>
                    <CustomIcon
                      size={14}
                      color={item.iconColor}
                      name="arrow-right"
                    />
                  </Box>
                </FlexBox>
              ))}
            </FlexBox>
          </Box>
        </FlexBox>
      </GridItem>
      <GridItem colSpan={{ base: 5, lg: 3 }} w="100%" h="full"></GridItem>
    </Grid>
  );
};

export default LinksPage;
