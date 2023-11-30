import { useState } from "react";
import styled from "styled-components/native";
import github_instance from "../api/api.github";
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";
import ResultView from "../components/ResultView";
import type { user } from "../types";

const fetchUser = async (username: string) => {
  try {
    const { data } = await github_instance.get(`/users/${username}`);
    return data as user;
  } catch (error) {
    console.log(error);
  }
};

const MainPage = ({ navigation }) => {
  const [user, setUser] = useState<user | undefined>();
  const [usernameInput, setUsernameInput] = useState<string>("");

  const eventHandler = async (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => {
    e.preventDefault();
    const newUser = await fetchUser(usernameInput);
    setUser(newUser);
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
      {user ? (
        <ResultView
          name={user.name}
          login={user.login}
          avatar_url={user.avatar_url}
          locale={user.location}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0d1117;
`;

const SearchBar = styled.TextInput.attrs({
  placeholderTextColor: "#6E7681",
  textAlign: "center",
})`
  color: #ffffff;
  width: 90%;
  min-width: 200px;
  height: 50px;
  background-color: #010409;
  border-radius: 10px;
  border: 1px solid #6e7681;
`;

export default MainPage;
