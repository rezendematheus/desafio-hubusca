import styled from "styled-components/native";
import type { user } from "../types";
import React from "react";
import { Pressable } from "react-native";

type Props = {
  user?: user;
  navigation;
};

const navigateToProfile = ({ navigation }, user: user) => {
  navigation.navigate("Profile", { user });
};

const ResultView = (props: Props) => {
  return (
    <StyledResultView>
      <Pressable
        onPress={() => {
          navigateToProfile({ navigation: props.navigation }, props.user);
        }}
      >
        <UserImage
          alt=""
          source={1}
          src={
            props.user.avatar_url ||
            "https://avatars.githubusercontent.com/u/86257656?v=4"
          }
        />
      </Pressable>
      <NameView>
        <Pressable
          onPress={() => {
            navigateToProfile({ navigation: props.navigation }, props.user);
          }}
        >
          <NameText>{props.user.name || "Não informado"} </NameText>
        </Pressable>

        <UsernameText>{props.user.login || "login_usuario"}</UsernameText>
        <LocaleText>{props.user.location || "Não informado"}</LocaleText>
      </NameView>
    </StyledResultView>
  );
};

export default ResultView;

const NameView = styled.View`
  display: flex;
  flex-direction: column;
`;

const NameText = styled.Text`
  color: #1f6feb;
`;

const UsernameText = styled.Text`
  color: #7d8590;
`;

const StyledResultView = styled.View`
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 15px 0px 15px 0px;
  height: 90px;
  width: 90%;
  min-width: 200px;
  border: 1px solid #6e7681;
  border-radius: 10px;
`;

const UserImage = styled.Image`
  background-color: white;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin: 0px 20px 0px 10px;
`;

const LocaleText = styled.Text`
  margin-top: 5px;
  font-size: 10px;
  color: #7d8590;
`;
