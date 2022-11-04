import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Center,
  Text,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  ENDPOINT_CONFIGS,
  GetUserProfileDataRequest,
  GetUserProfileDataResponse,
  Post,
} from "@footballtacticshub/shared";
import { useParams } from "react-router";
import { callEndpoint, replaceParams } from "../utils/callEndpoint";

import Icon from "../assets/logo/user.png";
import { PostCard } from "../components/postCard";
import { json } from "stream/consumers";

export const ViewProfile = () => {
  const { id } = useParams();

  const { data: userData } = useQuery([`view${id}profile`], () =>
    callEndpoint<GetUserProfileDataRequest, GetUserProfileDataResponse>(
      replaceParams(ENDPOINT_CONFIGS.getUserProfile, id!)
    )
  );

  if (!id) {
    return <div>This post page is invalid!</div>;
  }

  return (
    <Center>
      <Flex direction="column">
        <Image src={Icon} boxSize="200px" borderRadius="full" mx="auto" />
        <Heading>@{userData?.user.userName}</Heading>
        <Flex gap={5}>
          <Text>{userData?.stats.numberOfLikes} Likes</Text>
          <Text>{userData?.stats.numberOfComments} Comments</Text>
          <Text>{userData?.stats.numberOfPosts} Posts</Text>
        </Flex>
        <div>{!!userData?.recentPosts && userData?.recentPosts.length}</div>
      </Flex>
    </Center>
  );
};
