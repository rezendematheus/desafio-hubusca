import { useEffect, useState } from "react";
import styled from "styled-components/native";
import github_instance from "../api/api.github";
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";
import ResultView from "../components/ResultView";
import type { user } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecentSearchs from "../components/RecentSearchs";

const MainPage = ({ navigation }) => {
  const [user, setUser] = useState<user | undefined>();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [recentSearchs, setRecentSearchs] = useState([]);
  const [recentMenuStage, setRecentMenuStage] = useState("middle");

  useEffect(() => {
    const fetchLocalRecentList = async () => {
      try {
        const value = await AsyncStorage.getItem("RECENTSEARCHS");
        if (value !== null) {
          const list = JSON.parse(value) as user[];
          setRecentSearchs(list);
        }
      } catch (error) {}
    };
    fetchLocalRecentList();
  }, [user]);

  const eventHandler = async (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => {
    e.preventDefault();
    const newUser = await fetchUser(usernameInput);
    setUser(newUser);
    setUsernameInput("");
    const match = recentSearchs.find((user) => {
            
      if(user.id === newUser.id)
        return user
    });
    
    if (!match) {
      const newRecentSearchs = [...recentSearchs, newUser];
      setRecentSearchs(newRecentSearchs);
      storeLocalRecentList(newRecentSearchs);
    }
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
      <RecentSearchs stage={recentMenuStage} setStage={setRecentMenuStage}/>
    </Container>
  );
};

const fetchUser = async (username: string) => {
  try {
    const {
      data: {
        login,
        name,
        id,
        avatar_url,
        url,
        repos_url,
        location,
        followers,
        following,
      },
    } = await github_instance.get(`/users/${username}`);
    return {
      login,
      name,
      id,
      avatar_url,
      url,
      repos_url,
      location,
      followers,
      following,
    } as user;
  } catch (error) {
    console.log(error);
  }
};

const storeLocalRecentList = async (userArr: user[]) => {
  try {
    await AsyncStorage.setItem("RECENTSEARCHS", JSON.stringify(userArr));
  } catch (error) {
    console.log(error);
  }
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
