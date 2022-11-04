import { Flex, Text, Button, Center } from "@chakra-ui/react";
import { format } from "timeago.js";
import {
  CountPostCommentsRequest,
  CountPostCommentsResponse,
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
  return (
    <Center>
      <Flex maxW="md" width={500} my={5} direction="column" margin={5}>
        <Flex gap={3} justifyContent="space-between">
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
        <Flex gap={3}>
          <Text color="#31C48D">{user?.user.userName}</Text>
          <Text>{format(post.postedAt, "en_US")}</Text>
        </Flex>
      </Flex>
    </Center>
  );
};
