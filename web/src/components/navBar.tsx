import { Flex, Box, Button, Image } from "@chakra-ui/react";
import Logo from "../assets/logo/svg/logo-no-background.svg";
import { Link } from "react-router-dom";
import { isLoggedIn, signOut } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const NavBar = () => {
  const navigate = useNavigate();

  const onSignout = useCallback(() => {
    signOut();
    navigate("/");
  }, [navigate]);
  return (
    <Flex justify="space-between" margin={4} align="center">
      <Box>
        <Link to={"/"}>
          <Image src={Logo} height={10} />
        </Link>
      </Box>
      <Flex gap={3}>
        {isLoggedIn() ? (
          <>
            <Link to={"/new/post"}>
              <Button colorScheme="green" variant="solid">
                New post
              </Button>
            </Link>
            <Button variant="ghost" color="green" onClick={onSignout}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Link to={"signin"}>
              <Button variant="ghost" color="green">
                SignIn
              </Button>
            </Link>
            <Button colorScheme="green" variant="solid">
              SignUp
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
