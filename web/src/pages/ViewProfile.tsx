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
  GetUserRequest,
  GetUserResponse,
} from "@footballtacticshub/shared";
import { useParams } from "react-router";
import { getLocalStorageUserId, isLoggedIn } from "../utils/auth";
import { callEndpoint, replaceParams } from "../utils/callEndpoint";

import Icon from "../assets/logo/user.png";

export const ViewProfile = () => {
  const { id } = useParams();

  const { data: userData } = useQuery([`view${id}profile`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(
      replaceParams(ENDPOINT_CONFIGS.getUser, id!)
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
      </Flex>
    </Center>
  );
};
