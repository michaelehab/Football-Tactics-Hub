import { Button, Flex, Text } from "@chakra-ui/react";
import { format } from "timeago.js";
import {
  ENDPOINT_CONFIGS,
  GetUserRequest,
  GetUserResponse,
  Comment,
  DeleteCommentRequest,
  DeleteCommentResponse,
} from "@footballtacticshub/shared";
import { callEndpoint, replaceParams } from "../utils/callEndpoint";
import { useQuery } from "@tanstack/react-query";
import { getLocalStorageUserId } from "../utils/auth";
import { FormEvent, useCallback, useState } from "react";

export const CommentCard: React.FC<Comment> = (comment) => {
  const [commentText, setCommentText] = useState(comment.comment);
  const [commentUser, setCommentUser] = useState(comment.userId);

  const { data: user } = useQuery([`get${comment.id}User`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(
      replaceParams(ENDPOINT_CONFIGS.getUser, comment.userId)
    )
  );

  function strikeThrough(text: string) {
    return text
      .split("")
      .map((char) => char + "\u0336")
      .join("");
  }

  const deleteComment = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      const res = await callEndpoint<
        DeleteCommentRequest,
        DeleteCommentResponse
      >(replaceParams(ENDPOINT_CONFIGS.deleteComment, comment.id));
      setCommentText(strikeThrough(comment.comment));
      setCommentUser("");
    },
    [comment]
  );

  const userId: string = getLocalStorageUserId();

  return (
    <Flex maxW="md" width={500} my={5} direction="column" margin={5}>
      <Flex justifyContent="space-between">
        <Text fontSize="md" fontWeight="bold" color="#096A2E">
          {commentText}
        </Text>
        {!!(commentUser === userId) && (
          <Button onClick={deleteComment}>X</Button>
        )}
      </Flex>
      <Flex gap={3}>
        <Text color="#31C48D">{user?.user.userName}</Text>
        <Text>{format(comment.postedAt, "en_US")}</Text>
      </Flex>
    </Flex>
  );
};