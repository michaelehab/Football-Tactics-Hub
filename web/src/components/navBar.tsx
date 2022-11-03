import { Flex, Box, Button, Image } from "@chakra-ui/react";
import Logo from "../assets/logo/svg/logo-no-background.svg";
export const NavBar = () => {
  return (
    <Flex justify="space-between" margin={4} align="center">
      <Box>
        <Image src={Logo} height={10} />
      </Box>
      <Flex gap={3}>
        <Button variant={"ghost"}>SignIn</Button>
        <Button>SignUp</Button>
      </Flex>
    </Flex>
  );
};
