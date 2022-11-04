import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Icon from "../assets/illustration.png";

export const Hero = () => {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 15 }}
      >
        <Flex align="center">
          <Image src={Icon} height={{ sm: "10rem", lg: "15rem" }} />
        </Flex>
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Discussing Tactics{" "}
          <Text as={"span"} color={"orange.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Are you a football fan? We are all football fans here. Create an
          account, discuss with others, and show the world your new tactics!
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Link to="/signup">
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"orange.400"}
              _hover={{ bg: "orange.500" }}
            >
              Create an account
            </Button>
          </Link>
          <Link to="/posts">
            <Button rounded={"full"} px={6}>
              View Posts
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};
