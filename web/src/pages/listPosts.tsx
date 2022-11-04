import { useQuery } from "@tanstack/react-query";
import {
  ENDPOINT_CONFIGS,
  ListPostsRequest,
  ListPostsResponse,
} from "@footballtacticshub/shared";
import { callEndpoint } from "../utils/callEndpoint";
import { PostCard } from "../components/postCard";
import { useTitle } from "../utils/useTitle";
import { Center, Text, Flex } from "@chakra-ui/react";

export const ListPosts = () => {
  useTitle("Home");
  const { data, error, isLoading } = useQuery(["listPosts"], () =>
    callEndpoint<ListPostsRequest, ListPostsResponse>(
      ENDPOINT_CONFIGS.listPosts
    )
  );

  if (isLoading) {
    return <div>Is Loading...</div>;
  }
  if (error) {
    return <div>Error loading posts!</div>;
  }

  return (
    <Center>
      <Flex direction="column">
        {!!data?.posts && data.posts.length > 0 ? (
          data?.posts.map((post, i) => <PostCard key={i} {...post} />)
        ) : (
          <Text>No Posts right now</Text>
        )}
      </Flex>
    </Center>
  );
};
