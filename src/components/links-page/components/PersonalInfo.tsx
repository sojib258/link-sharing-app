import { TextNormal } from "@/components";
import { colors } from "@/lib";
import { Flex, FlexProps } from "@chakra-ui/react";
import { FC } from "react";

type PersonalInfoProps = FlexProps & {};

const PersonalInfo: FC<PersonalInfoProps> = ({ ...props }) => {
  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      mb="2rem"
      {...props}
    >
      <TextNormal fontSize=".875rem" fontWeight="600">
        Ben Wright
      </TextNormal>
      <TextNormal fontSize=".75rem" color={colors.menuTextColor}>
        ben@example.com
      </TextNormal>
    </Flex>
  );
};

export default PersonalInfo;
