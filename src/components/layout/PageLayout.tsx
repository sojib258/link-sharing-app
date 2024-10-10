import { Header } from "@/components";
import { TextProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type PageLayoutProps = TextProps & {
  children?: ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      {/* Footer */}
    </>
  );
};

export default PageLayout;
