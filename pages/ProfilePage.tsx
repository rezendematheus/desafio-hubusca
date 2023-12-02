import React from "react";
import styled from "styled-components/native";
import type { ProfileProps } from "../types";

const ProfilePage = ({ route, navigation}: ProfileProps) => {

  const { user } = route.params;
  console.log(user);
  

  return <Container></Container>;
};

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text``;

export default ProfilePage;
