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
  CountPostCommentsRequest,
  CountPostCommentsResponse,
  CountPostLikesRequest,
  CountPostLikesResponse,
  ENDPOINT_CONFIGS,
  GetUserRequest,
  GetUserResponse,
  Post,
} from "@footballtacticshub/shared";
import { Link } from "react-router-dom";
import { callEndpoint, replaceParams } from "../utils/callEndpoint";
import { useQuery } from "@tanstack/react-query";

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

  const { data: postLikes } = useQuery([`get${post.id}LikesCount`], () =>
    callEndpoint<CountPostLikesRequest, CountPostLikesResponse>(
      replaceParams(ENDPOINT_CONFIGS.countLikes, post.id)
    )
  );
  return (
    <Center>
      <Flex
        maxW="6xl"
        w={["sm", "xl", "4xl"]}
        m={5}
        direction="column"
        boxShadow="xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Flex gap={3} justifyContent="space-between" align="center">
          <Flex gap={2}>
            <Text fontSize="md" fontWeight="bold" color="#096A2E">
              {post.title}
            </Text>
            <Text color="#31C48D">-</Text>
            <ChakraLink color="#ADBFB8" href={post.url}>
              {post.url}
            </ChakraLink>
          </Flex>
          <Link to={`/post/${post.id}`}>
            <Button variant="outline" color="#ADBFB8">
              {data?.comments ?? 0} Comments
            </Button>
          </Link>
        </Flex>
        <Flex gap={3} justifyContent="space-between" align="center">
          <Flex gap={2}>
            <ChakraLink color="#31C48D" href={`/user/${user?.user.id}`}>
              {user?.user.userName}
            </ChakraLink>
            <Text color="#31C48D">-</Text>
            <Text color="#31C48D">{postLikes?.likes} Likes</Text>
          </Flex>
          <Text color="#31C48D">{format(post.postedAt, "en_US")}</Text>
        </Flex>
      </Flex>
    </Center>
  );
};
