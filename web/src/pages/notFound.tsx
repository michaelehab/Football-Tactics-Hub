import { Center, Flex, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PageNotFound from "../assets/404.svg";
import { useTitle } from "../utils/useTitle";

export const NotFound = () => {
  useTitle("Not Found");
  return (
    <Center flexDirection="column">
      <Flex align="center">
        <Image src={PageNotFound} height={{ sm: "20rem", lg: "30rem" }} />
      </Flex>
      <Link to="/">
        <Button rounded={"full"} px={6} colorScheme="green" variant="solid">
          Go Home
        </Button>
      </Link>
    </Center>
  );
};
