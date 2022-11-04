import {
  Box,
  Button,
  Flex,
  Input,
  Alert,
  AlertIcon,
  Center,
  Heading,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTitle } from "../utils/useTitle";
import { isLoggedIn } from "../utils/auth";
import {
  CreatePostRequest,
  CreatePostResponse,
  ENDPOINT_CONFIGS,
} from "@footballtacticshub/shared";
import { callEndpoint } from "../utils/callEndpoint";

export const NewPost = () => {
  useTitle("New Post");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const createPost = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      if (title === "" || url === "") {
        setError("Please make sure all the fields are not empty!");
      } else {
        try {
          const res = await callEndpoint<CreatePostRequest, CreatePostResponse>(
            ENDPOINT_CONFIGS.createPost,
            {
              title,
              url,
            }
          );
          navigate(`/post/${res.post.id}`);
        } catch (err) {
          setError(err as string);
        }
      }
    },
    [navigate, title, url]
  );

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <form onSubmit={createPost}>
      <Center>
        <Heading color="#31C48D">New Post</Heading>
      </Center>
      <Flex maxW="sm" mx="auto" my={10} direction="column" gap={3}>
        <Input
          placeholder="Post Title"
          value={title}
          variant="outline"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Post URL"
          value={url}
          variant="outline"
          onChange={(e) => setUrl(e.target.value)}
        />

        <Box m="auto">
          <Button
            colorScheme="green"
            variant="solid"
            type="submit"
            display="block"
            onClick={createPost}
          >
            Create Post
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
