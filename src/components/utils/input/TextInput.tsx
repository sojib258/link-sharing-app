/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

type TextInputProps = FormControlProps & {
  label?: string;
  type: string;
  name: string;
  errorMsg?: string;
  value: any;
  placeholder?: string;
  handleChange: (key: string, value: string) => void;
  isRequired?: boolean;
  submitted?: boolean;
  fieldKey: string;
};

const TextInput: FC<TextInputProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  handleChange,
  isRequired = false,
  fieldKey,
  ...props
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      display="flex"
      h="full"
      alignItems={{ base: "flex-start", md: "center" }}
      flexDir={{ base: "column", md: "row" }}
      {...props}
    >
      <FormLabel minW={{ base: "4rem", md: "10rem" }}>{label}</FormLabel>
      <Input
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
      />
    </FormControl>
  );
};

export default TextInput;
