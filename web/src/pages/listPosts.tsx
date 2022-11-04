import { useQuery } from "@tanstack/react-query";
import {
  ENDPOINT_CONFIGS,
  ListPostsRequest,
  ListPostsResponse,
} from "@footballtacticshub/shared";
import { callEndpoint } from "../utils/callEndpoint";
import { PostCard } from "../components/postCard";
import { useTitle } from "../utils/useTitle";

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
    <div>
      {!!data?.posts &&
        data.posts.map((post, i) => <PostCard key={i} {...post} />)}
    </div>
  );
};
