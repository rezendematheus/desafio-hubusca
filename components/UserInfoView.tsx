import React from "react";
import styled from "styled-components/native";
import { user } from "../types";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    userState: user;
};

const UserInfoView = ({userState}: Props) => {
  return (
    <StyledUserInfoView>
      <UserImage
        alt=""
        source={1}
        src={
          userState.avatar_url ||
          "https://avatars.githubusercontent.com/u/86257656?v=4"
        }
      />
      <PersonalInfoView>
        <NameView>
          <NameText>{userState.name || "Não informado"} </NameText>
          <UsernameText>
            {userState.login + " #ID" + userState.id || "login_usuario"}
          </UsernameText>

          <LocationText>
            <EvilIcons name="location" size={20} color="#7d8590" />{" "}
            {userState.location || "Não informado"}
          </LocationText>
        </NameView>
      </PersonalInfoView>
      <SocialStatsView>
        <SocialStatsText>
          <Ionicons name="people-outline" size={20} color="#7d8590" />
          {"  "}
          {userState.followers} followers
        </SocialStatsText>
        <SocialStatsText>
          <Ionicons name="bookmark-outline" size={20} color="#7d8590" />
          {"  "}
          {userState.public_repos} public repositories
        </SocialStatsText>
      </SocialStatsView>
    </StyledUserInfoView>
  );
};

const StyledUserInfoView = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
`;

const PersonalInfoView = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NameView = styled.View`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const NameText = styled.Text`
  color: #1f6feb;
  font-size: 25px;
`;

const UsernameText = styled.Text`
  color: #7d8590;
  font-size: 25px;
`;

const UserImage = styled.Image`
  height: 300px;
  width: 300px;
  border-width: 1px;
  border-color: #7d8590;
  border-radius: 150px;
  margin-bottom: 50px;
`;

const LocationText = styled.Text`
  margin-top: 5px;
  font-size: 15px;
  color: #7d8590;
`;

const SocialStatsView = styled.View`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
`;

const SocialStatsText = styled.Text`
  color: white;
  margin-bottom: 5px;
`;
export default UserInfoView;
