import { useQuery } from "@tanstack/react-query";
import {
  ENDPOINT_CONFIGS,
  ListPostsRequest,
  ListPostsResponse,
} from "@footballtacticshub/shared";
import { callEndpoint } from "../client";
import { PostCard } from "../components/postCard";

export const ListPosts = () => {
  const { url, method } = ENDPOINT_CONFIGS.listPosts;
  const { data, error, isLoading } = useQuery(["listPosts"], () =>
    callEndpoint<ListPostsRequest, ListPostsResponse>(url, method, {})
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
