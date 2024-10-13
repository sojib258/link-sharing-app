import { TextNormal } from "@/components";
import { colors } from "@/lib";
import { Flex, FlexProps } from "@chakra-ui/react";
import { FC } from "react";

type PersonalInfoProps = FlexProps & {
  data: {
    name: string;
    email: string;
  };
};

const PersonalInfo: FC<PersonalInfoProps> = ({ data, ...props }) => {
  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      mb="2rem"
      {...props}
    >
      <TextNormal fontSize=".875rem" fontWeight="600">
        {data?.name}
      </TextNormal>
      <TextNormal fontSize=".75rem" color={colors.menuTextColor}>
        {data?.email}
      </TextNormal>
    </Flex>
  );
};

export default PersonalInfo;
