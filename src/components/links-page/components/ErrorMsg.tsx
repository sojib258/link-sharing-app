import { TextNormal } from "@/components/utils";
import { colors } from "@/lib";
import { Alert, AlertIcon, AlertProps } from "@chakra-ui/react";
import { FC } from "react";

type ErrorMsgProps = AlertProps & {
  error: string;
};

const ErrorMsg: FC<ErrorMsgProps> = ({ error, ...props }) => {
  return (
    <Alert
      display="flex"
      alignItems="center"
      mb="1rem"
      bg="transparent"
      status="error"
      p={0}
      {...props}
    >
      <AlertIcon mr={2} width="1rem" h="1rem" />
      <TextNormal fontSize=".85rem" color={colors?.danger}>
        {error}
      </TextNormal>
    </Alert>
  );
};

export default ErrorMsg;
