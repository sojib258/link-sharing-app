import { PersonalInfoSkeleton, TextNormal } from "@/components";
import { colors } from "@/lib";
import { Flex, FlexProps } from "@chakra-ui/react";
import { FC } from "react";

type PersonalInfoProps = FlexProps & {
  firstName: string;
  lastName?: string;
  email: string;
  isLoading?: boolean;
};

const PersonalInfo: FC<PersonalInfoProps> = ({
  firstName,
  lastName,
  email,
  isLoading,
  ...props
}) => {
  if (isLoading) return <PersonalInfoSkeleton />;
  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      mb="2rem"
      {...props}
    >
      <TextNormal fontSize=".875rem" fontWeight="600">
        {firstName && firstName} {lastName && lastName}
      </TextNormal>
      <TextNormal fontSize=".75rem" color={colors.menuTextColor}>
        {email}
      </TextNormal>
    </Flex>
  );
};

export default PersonalInfo;
