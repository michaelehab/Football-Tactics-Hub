import {
  Flex,
  Text,
  Button,
  Center,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { format } from "timeago.js";
import {
  AddLikeRequest,
  AddLikeResponse,
  CheckLikeExistsRequest,
  CheckLikeExistsResponse,
  CountPostCommentsRequest,
  CountPostCommentsResponse,
  CountPostLikesRequest,
  CountPostLikesResponse,
  DeleteLikeRequest,
  DeleteLikeResponse,
  ENDPOINT_CONFIGS,
  GetUserRequest,
  GetUserResponse,
  Post,
} from "@footballtacticshub/shared";
import { Link } from "react-router-dom";
import { callEndpoint, replaceParams } from "../utils/callEndpoint";
import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "../utils/auth";
import { CheckIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { FormEvent, useCallback } from "react";

export const PostCard: React.FC<Post> = (post) => {
  const { data } = useQuery([`count${post.id}Comments`], () =>
    callEndpoint<CountPostCommentsRequest, CountPostCommentsResponse>(
      replaceParams(ENDPOINT_CONFIGS.countComments, post.id)
    )
  );

  const { data: user } = useQuery([`get${post.id}User`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(
      replaceParams(ENDPOINT_CONFIGS.getUser, post.userId)
    )
  );

  const { data: postLikes, refetch: refetchLikes } = useQuery(
    [`get${post.id}LikesCount`],
    () =>
      callEndpoint<CountPostLikesRequest, CountPostLikesResponse>(
        replaceParams(ENDPOINT_CONFIGS.countLikes, post.id)
      )
  );

  const { data: userLikedPost, refetch: refetchLikeExist } = useQuery(
    [`get${post.id}LikesExist`],
    () =>
      callEndpoint<CheckLikeExistsRequest, CheckLikeExistsResponse>(
        replaceParams(ENDPOINT_CONFIGS.checkLikeExist, post.id)
      )
  );

  const addLike = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      await callEndpoint<AddLikeRequest, AddLikeResponse>(
        replaceParams(ENDPOINT_CONFIGS.createLike, post.id)
      );
      refetchLikes();
      refetchLikeExist();
    },
    [post, refetchLikeExist, refetchLikes]
  );

  const removeLike = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      await callEndpoint<DeleteLikeRequest, DeleteLikeResponse>(
        replaceParams(ENDPOINT_CONFIGS.deleteLike, post.id)
      );
      refetchLikes();
      refetchLikeExist();
    },
    [post, refetchLikeExist, refetchLikes]
  );

  return (
    <Center>
      <Box
        maxW="6xl"
        w={["sm", "xl", "3xl"]}
        m={5}
        boxShadow="xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Flex gap={3} justifyContent="space-between" align="center">
          <Flex gap={2}>
            <Box>
              {isLoggedIn() &&
                (userLikedPost?.exists ? (
                  <Button onClick={removeLike} height={4}>
                    <CheckIcon />
                  </Button>
                ) : (
                  <Button onClick={addLike} height={4}>
                    <TriangleUpIcon />
                  </Button>
                ))}
            </Box>
            <Link to={`/post/${post.id}`}>
              <Text fontSize="md" fontWeight="bold">
                {post.title}
              </Text>
            </Link>
            {post.url !== "NoLink" && (
              <ChakraLink color="#ADBFB8" href={post.url}>
                Visit Link
              </ChakraLink>
            )}
          </Flex>
          <Text color="#ADBFB8">{data?.comments ?? 0} Comments</Text>
        </Flex>
        <Flex gap={3} justifyContent="space-between" align="center">
          <Flex gap={2}>
            <ChakraLink color={"orange.400"} href={`/user/${user?.user.id}`}>
              {user?.user.userName}
            </ChakraLink>
            <Text color="#31C48D">-</Text>
            <Text color="#31C48D">{postLikes?.likes} Likes</Text>
          </Flex>
          <Text color="#31C48D">{format(post.postedAt, "en_US")}</Text>
        </Flex>
      </Box>
    </Center>
  );
};
