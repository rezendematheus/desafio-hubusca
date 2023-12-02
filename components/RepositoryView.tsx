import { View, Text, Pressable, Linking } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { repo } from "../types";

type Props = {
  repo: repo;
};

const RepositoryView = ({ repo }: Props) => {
  return (
    <StyledRepositoryView style={{ borderTopWidth: 1 }}>
      <HeaderView>
      <Pressable
          onPress={() => {
            Linking.openURL(repo.html_url);
          }}
        >
          <NameText>{repo.name}</NameText>
        </Pressable>
        <GreyText>created on {convertDate(repo.created_at)}</GreyText>
      </HeaderView>
      <MiddleView>
        <GreyText>{repo.language}</GreyText>
        <GreyText>last push {convertDate(repo.pushed_at)}</GreyText>
      </MiddleView>
      <WhiteText numberOfLines={5}>
        {repo.description || "Sem descrição."}
      </WhiteText>
    </StyledRepositoryView>
  );
};

const convertDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

const StyledRepositoryView = styled.View`
  box-sizing: border-box;
  width: 100%;
  min-height: 95px;
  max-height: 200px;
  border-color: #7d8590;
  margin-bottom: 20px;
`;

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 3px;
`;

const MiddleView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 70%;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const GreyText = styled.Text`
  color: #7d8590;
  font-size: 15px;
`;

const WhiteText = styled.Text`
  color: #ffffff;
`;

const NameText = styled.Text`
  color: #1f6feb;
  font-size: 20px;
`;

export default RepositoryView;
