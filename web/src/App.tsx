import { listPosts } from "./client";
import { useQuery } from "@tanstack/react-query";
import { ListPostResponse } from "@footballtacticshub/shared";

export const App = () => {
  const { data, error, isLoading } = useQuery<ListPostResponse>(
    ["listPosts"],
    listPosts
  );

  if (isLoading) {
    return <div>Is Loading...</div>;
  }
  if (error) {
    return <div>Error loading posts!</div>;
  }

  return (
    <div>
      Posts:
      {!!data?.posts && <div>{JSON.stringify(data.posts)}</div>}
    </div>
  );
};
