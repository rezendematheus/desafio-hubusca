import { useEffect, useState } from "react";
import styled from "styled-components/native";
import github_instance from "../api/api.github";
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";
import ResultView from "../components/ResultView";
import type { MainProps, user } from "../types";
import RecentSearchs from "../components/RecentSearchs";
import SearchBar from "../components/SearchBar";
import {
  fetchLocalRecentList,
  storeLocalRecentList,
} from "../asyncStorage/RecentUserList";

const MainPage = ({ navigation }: MainProps) => {
  const [user, setUser] = useState<user | undefined>();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [recentUserList, setRecentUserList] = useState<user[]>([]);
  const [recentMenuStage, setRecentMenuStage] = useState("middle");
  const [searchError, setSearchError] = useState<number>(0);
  const [searchErrorMessage, setSearchErrorMessage] = useState("")

  useEffect(() => {
    fetchLocalRecentList(setRecentUserList);
  }, []);

  const eventHandler = async (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => {
    e.preventDefault();
    let newUser: user;
    try {
      if(usernameInput === "" ) throw Error;
      newUser = await fetchUser(usernameInput);
    } catch (error) {
      if (error?.response?.status === 404) setSearchError(404);
      else if (usernameInput === "" ){
        setSearchError(400);
        setSearchErrorMessage("Campo de busca vazio");
      }
      else {
        setSearchError(400);
        setSearchErrorMessage("Algo deu errado");
      }
      console.log(error);
      return;
    }
    setUsernameInput("");

    const user = recentUserList?.find((user) => {
      return user.id === newUser.id;
    });

    if (user) {
      const recentCopy = recentUserList.filter((user) => {
        return user.id !== newUser.id;
      });

      recentCopy.push(newUser);

      setRecentUserList(recentCopy);
      storeLocalRecentList(recentCopy);
    } else {
      const recentCopy = [...recentUserList, newUser];

      setRecentUserList(recentCopy);
      storeLocalRecentList(recentCopy);
    }
    setSearchError(0);
    setUser(newUser);
  };

  return (
    <Container>
      <SearchBar
        usernameInput={usernameInput}
        setUsernameInput={setUsernameInput}
        eventHandler={eventHandler}
        searchError={searchError}
      />
      {searchError ? (
        searchError === 404 ? (
          <ErrorText>Usuário não existe</ErrorText>
        ) : (
          <ErrorText>{searchErrorMessage}</ErrorText>
        )
      ) : (
        <></>
      )}
      {user ? (
        <ResultView
          key={user.id}
          navigation={navigation}
          user={user}
        />
      ) : (
        <></>
      )}
      <RecentSearchs
        key="recent"
        stage={recentMenuStage}
        setStage={setRecentMenuStage}
        userList={recentUserList}
        resultUserId={user?.id || 0}
        navigation={navigation}
      />
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
        public_repos
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
      public_repos
    } as user;
  } catch (error) {
    throw error;
  }
};

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0d1117;
`;

const ErrorText = styled.Text`
  margin-top: 15px;
  color: #f85149;
`;

export default MainPage;
