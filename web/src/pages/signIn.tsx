import { Box, Button, Flex, Text, Input } from "@chakra-ui/react";
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
      try {
        await signIn(login, passWord);
        navigate("/");
      } catch {
        setError("Bad credentials");
      }
    },
    [navigate, passWord, login]
  );

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <form onSubmit={signin}>
      <Flex maxW="sm" mx="auto" my={10} direction="column" gap={4}>
        <Input
          placeholder="Username or email"
          value={login}
          variant="filled"
          onChange={(e) => setLogin(e.target.value)}
        />

        <Input
          placeholder="Password"
          variant="filled"
          type="password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />

        <Box m="auto">
          <Button type="submit" display="block" onClick={signin}>
            Sign in
          </Button>
        </Box>

        {!!error && <Text color="red.700">{error}</Text>}
      </Flex>
    </form>
  );
};
