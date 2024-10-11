import { colors } from "@/lib";
import { Button, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

type SaveButtonProps = ButtonProps & {
  children: string;
};

const SaveButton: FC<SaveButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="outline"
      py="2px"
      size="md"
      bg={colors.primary}
      color={colors.white}
      transition=".3s"
      border="none"
      _hover={{ backgroundColor: colors.deepPrimary }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SaveButton;
