import { useParams } from "react-router";

export const GetPost = () => {
  const { id } = useParams();

  return <div>Viewing Post with id: {id}</div>;
};
