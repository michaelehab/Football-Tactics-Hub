import { Flex, Text, Button, Center } from "@chakra-ui/react";
import { format } from "timeago.js";
import {
  ENDPOINT_CONFIGS,
  GetUserRequest,
  GetUserResponse,
  Comment,
} from "@footballtacticshub/shared";
import { callEndpoint, replaceParams } from "../utils/callEndpoint";
import { useQuery } from "@tanstack/react-query";

export const CommentCard: React.FC<Comment> = (comment) => {
  const { data: user } = useQuery([`get${comment.id}User`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(
      replaceParams(ENDPOINT_CONFIGS.getUser, comment.userId)
    )
  );
  return (
    <Flex maxW="md" width={500} my={5} direction="column" margin={5}>
      <Text fontSize="md" fontWeight="bold" color="#096A2E">
        {comment.comment}
      </Text>
      <Flex gap={3}>
        <Text color="#31C48D">{user?.user.userName}</Text>
        <Text>{format(comment.postedAt, "en_US")}</Text>
      </Flex>
    </Flex>
  );
};
