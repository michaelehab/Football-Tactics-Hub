import {
  Box,
  Button,
  Flex,
  Input,
  Alert,
  AlertIcon,
  Heading,
  Center,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTitle } from "../utils/useTitle";
import { isLoggedIn, signIn } from "../utils/auth";

export const SignIn = () => {
  useTitle("Sign in");
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [passWord, setPassWord] = useState("");
  const [error, setError] = useState("");

  const signin = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      if (login === "" || passWord === "") {
        setError("Login or password can't be empty!");
      } else {
        try {
          await signIn(login, passWord);
          navigate("/");
        } catch (err) {
          setError(err as string);
        }
      }
    },
    [navigate, login, passWord]
  );

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <form onSubmit={signin}>
      <Center>
        <Heading color="#31C48D">SignIn</Heading>
      </Center>
      <Flex maxW="sm" mx="auto" my={10} direction="column" gap={3}>
        <Input
          placeholder="Username or email"
          value={login}
          variant="outline"
          onChange={(e) => setLogin(e.target.value)}
        />

        <Input
          placeholder="Password"
          variant="outline"
          type="password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />

        <Box m="auto">
          <Button
            colorScheme="green"
            variant="solid"
            type="submit"
            display="block"
            onClick={signin}
          >
            Sign in
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
