import { Flex, Box, Button, Image } from "@chakra-ui/react";
import Logo from "../assets/logo/svg/logo-no-background.svg";
import { Link } from "react-router-dom";
import { getLocalStorageUserId, isLoggedIn, signOut } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const NavBar = () => {
  const navigate = useNavigate();
  const userId: string = getLocalStorageUserId();

  const onSignout = useCallback(() => {
    signOut();
    navigate("/");
  }, [navigate]);
  return (
    <Flex justify="space-between" margin={4} align="center" p={2}>
      <Box>
        <Link to={"/"}>
          <Image src={Logo} height={10} />
        </Link>
      </Box>
      <Flex gap={3}>
        {isLoggedIn() ? (
          <>
            <Link to={`/user/${userId}`}>
              <Button colorScheme="green" variant="outline">
                Profile
              </Button>
            </Link>
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
            <Link to={"signup"}>
              <Button colorScheme="green" variant="solid">
                SignUp
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};
