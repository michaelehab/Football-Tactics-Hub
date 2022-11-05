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
  DeletePostRequest,
  DeletePostResponse,
  ENDPOINT_CONFIGS,
  GetPostRequest,
  GetPostResponse,
  ListCommentsRequest,
  ListCommentsResponse,
} from "@footballtacticshub/shared";
import { useNavigate } from "react-router-dom";
import { FormEvent, useCallback, useState } from "react";
import { useParams } from "react-router";
import { getLocalStorageUserId, isLoggedIn } from "../utils/auth";
import { callEndpoint, replaceParams } from "../utils/callEndpoint";
import { CommentCard } from "../components/commentCard";
import { PostCard } from "../components/postCard";
import { PostView } from "../components/postView";
import { NotFound } from "./notFound";

export const GetPost = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId: string = getLocalStorageUserId();

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

  const deletePost = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      await callEndpoint<DeletePostRequest, DeletePostResponse>(
        replaceParams(ENDPOINT_CONFIGS.deletePost, postData?.post.id!)
      );
      navigate("/");
    },
    [navigate, postData]
  );

  const addComment = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      if (comment === "") {
        setError("Comment can't be empty");
      } else {
        await callEndpoint<CreateCommentRequest, CreateCommentResponse>(
          replaceParams(ENDPOINT_CONFIGS.createComment, id!),
          {
            comment,
          }
        );
        setComment("");
        refetchComments();
      }
    },
    [comment, id, refetchComments]
  );

  if (!id || !postData) {
    return <NotFound />;
  }

  return (
    <Center>
      <Box>
        <Flex align="center">
          <PostView {...postData?.post!} />
          {!!(postData?.post.userId === userId) && (
            <Button onClick={deletePost} title="Delete Post">
              X
            </Button>
          )}
        </Flex>
        <Flex direction="column">
          {!!commentsData && commentsData.comments.length > 0 ? (
            commentsData.comments.map((c, i) => <CommentCard key={i} {...c} />)
          ) : (
            <Center>No comments on this post</Center>
          )}
        </Flex>
        {isLoggedIn() && (
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
        )}
      </Box>
    </Center>
  );
};
