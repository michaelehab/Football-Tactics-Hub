import {
  Box,
  Button,
  Flex,
  Input,
  Alert,
  AlertIcon,
  Center,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isHttpUri, isHttpsUri } from "valid-url";
import { useTitle } from "../utils/useTitle";
import { isLoggedIn } from "../utils/auth";
import {
  CreatePostRequest,
  CreatePostResponse,
  ENDPOINT_CONFIGS,
  noLinkInPost,
} from "@footballtacticshub/shared";
import { callEndpoint } from "../utils/callEndpoint";

export const NewPost = () => {
  useTitle("New Post");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const createPost = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      if (title === "" && content === "") {
        setError("Please make the post title and content are not empty!");
      } else if (url !== "" && !isHttpUri(url) && !isHttpsUri(url)) {
        setError("Please make sure the url is valid");
      } else {
        try {
          const res = await callEndpoint<CreatePostRequest, CreatePostResponse>(
            ENDPOINT_CONFIGS.createPost,
            {
              title,
              url: url ? url : noLinkInPost,
              content,
            }
          );
          navigate(`/post/${res.post.id}`);
        } catch (err) {
          setError(err as string);
        }
      }
    },
    [navigate, title, url, content]
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

        <Textarea
          placeholder="Post Content"
          value={content}
          variant="outline"
          onChange={(e) => setContent(e.target.value)}
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
