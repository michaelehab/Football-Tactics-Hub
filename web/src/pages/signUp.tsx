import { Box, Button, Flex, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTitle } from "../utils/useTitle";
import { isLoggedIn, signUp } from "../utils/auth";

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
      } else {
        try {
          await signUp(firstName, lastName, userName, email, passWord);
          navigate("/");
        } catch {
          setError("Something went wrong, please try again");
        }
      }
    },
    [navigate, firstName, lastName, userName, email, passWord]
  );

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <form onSubmit={signup}>
      <Flex maxW="sm" mx="auto" my={10} direction="column" gap={3}>
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
          variant="outline"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />

        <Input
          placeholder="Confirm Password"
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
