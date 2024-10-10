import { padding } from "@/lib/config/constants";
import { Grid, GridProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type ContainerProps = GridProps & {
  children: ReactNode;
};

const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Grid
      px={{ base: padding.P_MOBILE, lg: padding.P_DESKTOP }}
      py="1rem"
      w="full"
      templateColumns="repeat(3, 1fr)"
      gap={6}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default Container;
