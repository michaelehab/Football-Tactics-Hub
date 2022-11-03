import { Flex, Box, Text, Button } from "@chakra-ui/react";
import {
  CountPostCommentsRequest,
  CountPostCommentsResponse,
  ENDPOINT_CONFIGS,
  GetUserRequest,
  GetUserResponse,
  Post,
} from "@footballtacticshub/shared";
import { Link } from "react-router-dom";
import { callEndpoint } from "../client";
import { useQuery } from "@tanstack/react-query";

export const PostCard: React.FC<Post> = (post) => {
  const { url, method } = ENDPOINT_CONFIGS.countComments;
  const { data, error, isLoading } = useQuery([`count${post.id}Comments`], () =>
    callEndpoint<CountPostCommentsRequest, CountPostCommentsResponse>(
      url.replace(":postId", post.id),
      method,
      {}
    )
  );

  const { url: getUserUrl, method: getUserMethod } = ENDPOINT_CONFIGS.getUser;
  const { data: user } = useQuery([`get${post.id}User`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(
      getUserUrl.replace(":userId", post.userId),
      getUserMethod,
      {}
    )
  );
  return (
    <Box>
      <Flex gap={3}>
        <Text fontSize="md" fontWeight="bold" color="#096A2E">
          {post.title}
        </Text>
        <Text color="#ADBFB8">{post.url}</Text>
        <Link to={`/post/${post.id}`}>
          <Button height={7} variant="outline" color="#ADBFB8">
            {data?.comments ?? 0} Comments
          </Button>
        </Link>
      </Flex>
      <Text>{user?.user.userName}</Text>
    </Box>
  );
};
