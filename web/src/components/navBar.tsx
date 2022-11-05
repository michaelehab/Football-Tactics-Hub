/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as ChakraLink,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import Logo from "../assets/logo/svg/logo-no-background.svg";
import UserAvatar from "../assets/user.png";
import { getLocalStorageUserId, isLoggedIn, signOut } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Links = ["Posts"];

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const userId: string = getLocalStorageUserId();

  const onSignout = useCallback(() => {
    signOut();
    navigate("/");
  }, [navigate]);

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        marginBottom={5}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link to={"/"}>
              <Image src={Logo} height={10} />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link to={link.toLowerCase()}>
                  <Button
                    px={2}
                    py={1}
                    color={"green"}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                  >
                    {link}
                  </Button>
                </Link>
              ))}
            </HStack>
          </HStack>
          {isLoggedIn() ? (
            <Flex alignItems={"center"}>
              <Link to={"/new/post"}>
                <Button
                  variant={"solid"}
                  colorScheme="green"
                  size={"sm"}
                  mr={4}
                  leftIcon={<AddIcon />}
                >
                  New Post
                </Button>
              </Link>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={UserAvatar} />
                </MenuButton>
                <MenuList>
                  <Link to={`/user/${userId}`}>
                    <MenuItem>My Profile</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem onClick={onSignout}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Flex>
              <Link to={"/signin"}>
                <Button variant="ghost" color="green">
                  SignIn
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button colorScheme="green" variant="solid">
                  SignUp
                </Button>
              </Link>
            </Flex>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link to={link.toLowerCase()}>
                  <Button
                    px={2}
                    py={1}
                    color={"green"}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                  >
                    {link}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
