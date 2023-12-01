import styled from "styled-components/native";

import React from "react";

type Props = {
  name?: string;
  login?: string;
  avatar_url?: string;
  locale?: string;
};

const RecentResultView = (props: Props) => {
    return (
    <StyledRecentResultView>
      <UserImage
        alt=""
        source={1}
        src={props.avatar_url || "https://avatars.githubusercontent.com/u/86257656?v=4"}
      />
      <NameView>
        <NameText>{props.name || "Não informado"} </NameText>
        <UsernameText>{props.login || "login_usuario"}</UsernameText>
        <LocaleText>{props.locale || "Não informado"}</LocaleText>
      </NameView>
    </StyledRecentResultView>
  );
};

export default RecentResultView;

const box = styled.View``;

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

const StyledRecentResultView = styled.View`
margin-top: 15px;
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
