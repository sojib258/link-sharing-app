import { colors } from "@/lib";
import { Button, ButtonProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type IconButtonProps = ButtonProps & {
  children?: string | ReactNode;
  leftIcon?: ReactNode;
};

const IconButton: FC<IconButtonProps> = ({ leftIcon, children, ...props }) => {
  return (
    <Button
      border="none"
      leftIcon={leftIcon}
      variant="outline"
      color={colors.primary}
      _hover={{ background: colors.lightPrimary }}
      fontSize="1rem"
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
