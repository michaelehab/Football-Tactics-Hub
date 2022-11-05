import {
  Box,
  Button,
  Flex,
  Input,
  Alert,
  AlertIcon,
  Center,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTitle } from "../utils/useTitle";
import { isLoggedIn, signUp } from "../utils/auth";
import { validatePassword, validateUserName } from "../utils/validate";

export const SignUp = () => {
  useTitle("Sign Up");
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const [error, setError] = useState("");

  const signup = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      if (
        firstName === "" ||
        lastName === "" ||
        userName === "" ||
        email === "" ||
        passWord === ""
      ) {
        setError("Please make sure all the fields are not empty!");
      } else if (passWord !== confirmPassWord) {
        setError("Confirm Password doesn't match password!");
      } else if (!validateUserName(userName)) {
        setError("Make sure your username match the required criteria");
      } else if (!validatePassword(passWord)) {
        setError("Make sure your password match the required criteria");
      } else {
        try {
          await signUp(firstName, lastName, userName, email, passWord);
          navigate("/");
        } catch (err) {
          setError(err as string);
        }
      }
    },
    [navigate, firstName, lastName, userName, email, passWord, confirmPassWord]
  );

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <form onSubmit={signup}>
      <Center flexDirection="column">
        <Heading color="#31C48D">SignUp</Heading>
        <Box margin={5}>
          <Alert status="info" padding={5}>
            <AlertIcon />
            <UnorderedList>
              <ListItem>
                Username Only contains alphanumeric characters, underscore and
                dot.
              </ListItem>
              <ListItem>
                Underscore and dot can't be at the end or start of a username
                (e.g_username / username_ / .username / username.).
              </ListItem>
              <ListItem>
                Underscore and dot can't be next to each other (e.g user_.name).
              </ListItem>
              <ListItem>
                Underscore or dot can't be used multiple times in a row (e.g
                user__name / user..name).
              </ListItem>
              <ListItem>
                Number of characters of username must be between 8 to 20.
              </ListItem>
              <ListItem>
                Password must contain at least one english lower letter and one
                english upper letter
              </ListItem>
              <ListItem>
                Password must contain at least one digit and one special
                character
              </ListItem>
              <ListItem>Password length can't be less than 8</ListItem>
            </UnorderedList>
          </Alert>
        </Box>
      </Center>
      <Flex maxW="sm" my={3} mx="auto" direction="column" gap={3}>
        <Flex gap={2}>
          <Input
            placeholder="First Name"
            value={firstName}
            variant="outline"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input
            placeholder="Last Name"
            value={lastName}
            variant="outline"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Flex>

        <Input
          placeholder="Username"
          value={userName}
          variant="outline"
          onChange={(e) => setUserName(e.target.value)}
        />

        <Input
          placeholder="Email"
          value={email}
          variant="outline"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          variant="outline"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />

        <Input
          placeholder="Confirm Password"
          type="password"
          variant="outline"
          value={confirmPassWord}
          onChange={(e) => setConfirmPassWord(e.target.value)}
        />

        <Box m="auto">
          <Button
            colorScheme="green"
            variant="solid"
            type="submit"
            display="block"
            onClick={signup}
          >
            Sign Up
          </Button>
        </Box>

        {!!error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
      </Flex>
    </form>
  );
};
