import { colors } from "@/lib";
import { Button, ButtonProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { FiPlus } from "react-icons/fi";

type AddButtonProps = ButtonProps & {
  children?: string | ReactNode;
  leftIcon?: ReactNode;
};

const AddButton: FC<AddButtonProps> = ({ leftIcon, children, ...props }) => {
  return (
    <Button
      w="full"
      textAlign="center"
      border={`1px solid ${colors.primary}`}
      leftIcon={leftIcon || <FiPlus fontSize={14} />}
      variant="outline"
      color={colors.primary}
      _hover={{ background: colors.lightPrimary }}
      my="2rem"
      fontSize=".85rem"
      fontWeight="500"
      {...props}
    >
      {children}
    </Button>
  );
};

export default AddButton;
