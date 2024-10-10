import { colors } from "@/lib";
import { Button, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

type TextButtonProps = ButtonProps & {
  children: string;
};

const TextButton: FC<TextButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      color={colors.primary}
      border={`2px solid ${colors.borderColor}`}
      variant="outline"
      py="2px"
      size="md"
      {...props}
    >
      {children}
    </Button>
  );
};

export default TextButton;
