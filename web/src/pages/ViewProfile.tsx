import { Box, Flex, Center, Text, Heading, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  ENDPOINT_CONFIGS,
  GetUserProfileDataRequest,
  GetUserProfileDataResponse,
  userProfilePostsLimit,
} from "@footballtacticshub/shared";
import { useParams } from "react-router";
import { callEndpoint, replaceParams } from "../utils/callEndpoint";

import Icon from "../assets/logo/user.png";
import { PostCard } from "../components/postCard";

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
    <Center flexDirection="column">
      <Flex direction="column" boxShadow="md" p="6" rounded="md" width="100vw">
        <Image src={Icon} boxSize="200px" borderRadius="full" mx="auto" />
        <Box mx="auto">
          <Heading as="h2" size="2xl">
            {userData?.user.userName}
          </Heading>
          <Flex gap={5} margin={2}>
            <Text>{userData?.stats.numberOfLikes} Likes</Text>
            <Text>{userData?.stats.numberOfComments} Comments</Text>
            <Text>{userData?.stats.numberOfPosts} Posts</Text>
          </Flex>
        </Box>
      </Flex>
      <Flex direction="column" margin={5}>
        {!!userData?.recentPosts && userData.recentPosts.length > 0 && (
          <Heading as="h3" size="lg">
            Recent{" "}
            {Math.min(userProfilePostsLimit, userData.recentPosts.length)} Posts
          </Heading>
        )}
        {!!userData?.recentPosts && userData.recentPosts.length > 0 ? (
          userData?.recentPosts.map((post, i) => <PostCard key={i} {...post} />)
        ) : (
          <Text>This user has no posts</Text>
        )}
      </Flex>
    </Center>
  );
};
