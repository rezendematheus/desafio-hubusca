import React, { useState } from "react";
import styled from "styled-components/native";
import github_instance from "../api/api.github";
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";
import ResultView from "../components/ResultView";

const fetchUser = async (user: string) => {
  try {
    const test = await github_instance.get(`/users/${user}`);
    console.log(test.data.login);
    return test;
  } catch (error) {
    console.log(error);
  }
};

const MainPage = ({ navigation }) => {
  const [usernameInput, setUsernameInput] = useState("");

  const eventHandler = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => {
    e.preventDefault();
    fetchUser(usernameInput);
    setUsernameInput("");
  };
  return (
    <Container>
      <SearchBar
        value={usernameInput}
        onEndEditing={eventHandler}
        onChangeText={setUsernameInput}
        placeholder="Digite o nome do usuário"
      />
      <ResultView />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0D1117;
`;

const Title = styled.Text``;

const SearchBar = styled.TextInput.attrs({
  placeholderTextColor: '#6E7681',
  textAlign: "center",
})`
  color: #FFFFFF;
  width: 90%;
  min-width: 200px;
  height: 50px;
  background-color: #010409;
  border-radius: 10px;
  border: 1px solid #6E7681;
`;


export default MainPage;
