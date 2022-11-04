import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  CreateCommentRequest,
  CreateCommentResponse,
  ENDPOINT_CONFIGS,
  GetPostRequest,
  GetPostResponse,
  ListCommentsRequest,
  ListCommentsResponse,
} from "@footballtacticshub/shared";
import { FormEvent, useCallback, useState } from "react";
import { useParams } from "react-router";
import { isLoggedIn } from "../utils/auth";
import { callEndpoint, replaceParams } from "../utils/callEndpoint";
import { CommentCard } from "../components/commentCard";
import { PostCard } from "../components/postCard";

export const GetPost = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const { data: postData } = useQuery([`view${id}post`], () =>
    callEndpoint<GetPostRequest, GetPostResponse>(
      replaceParams(ENDPOINT_CONFIGS.getPost, id!)
    )
  );

  const { data: commentsData, refetch: refetchComments } = useQuery(
    [`list${id}comments`],
    () =>
      callEndpoint<ListCommentsRequest, ListCommentsResponse>(
        replaceParams(ENDPOINT_CONFIGS.listComments, id!)
      )
  );

  const addComment = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      if (comment === "") {
        setError("Comment can't be empty");
      } else {
        const res = await callEndpoint<
          CreateCommentRequest,
          CreateCommentResponse
        >(replaceParams(ENDPOINT_CONFIGS.createComment, id!), {
          comment,
        });
        setComment("");
        refetchComments();
      }
    },
    [comment, id, refetchComments]
  );

  if (!id) {
    return <div>This post page is invalid!</div>;
  }

  return (
    <Center>
      <Flex direction="column">
        <PostCard {...postData?.post!} />
        {!!commentsData &&
          commentsData.comments.map((c, i) => <CommentCard key={i} {...c} />)}
        {isLoggedIn() ? (
          <form onSubmit={addComment}>
            <Flex maxW="sm" mx="auto" my={10} direction="column" gap={3}>
              <Input
                placeholder="Enter Your Comment"
                value={comment}
                variant="outline"
                onChange={(e) => setComment(e.target.value)}
              />

              <Box m="auto">
                <Button
                  colorScheme="green"
                  variant="solid"
                  type="submit"
                  display="block"
                  onClick={addComment}
                >
                  Add Comment
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
        ) : (
          <div>You have to sign in to add comments!</div>
        )}
      </Flex>
    </Center>
  );
};
