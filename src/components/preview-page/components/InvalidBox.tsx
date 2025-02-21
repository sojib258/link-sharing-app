import { TextNormal } from "@/components";
import { Center } from "@chakra-ui/react";
import PreviewCartConatiner from "./PreviewCartContainer";

const InvalidBox = () => {
  return (
    <PreviewCartConatiner mx="auto">
      <Center w="200px" h="300px">
        <TextNormal textAlign="center">
          Looks like invalid url! <br /> No Data Found!
        </TextNormal>
      </Center>
    </PreviewCartConatiner>
  );
};

export default InvalidBox;
