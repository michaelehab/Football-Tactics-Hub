import { ListPostResponse, ListPostRequest } from "@footballtacticshub/shared";

export const HOST = "http://localhost:3001";

export const listPosts = async (
  req: ListPostRequest
): Promise<ListPostResponse> => {
  const response = await fetch(`${HOST}/api/v1/posts/`);

  return response.json();
};
