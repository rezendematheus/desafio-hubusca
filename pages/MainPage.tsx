import { useEffect, useState } from "react";
import styled from "styled-components/native";
import github_instance from "../api/api.github";
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";
import ResultView from "../components/ResultView";
import type { user } from "../types";
import RecentSearchs from "../components/RecentSearchs";
import SearchBar from "../components/SearchBar";
import {
  fetchLocalRecentList,
  storeLocalRecentList,
} from "../asyncStorage/RecentUserList";

const MainPage = ({ navigation }) => {
  const [user, setUser] = useState<user | undefined>();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [recentUserList, setRecentUserList] = useState<user[]>([]);
  const [recentMenuStage, setRecentMenuStage] = useState("middle");
  const [searchError, setSearchError] = useState<number>(0);

  useEffect(() => {
    fetchLocalRecentList(setRecentUserList);
  }, []);

  const eventHandler = async (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => {
    e.preventDefault();
    let newUser: user;
    try {
      newUser = await fetchUser(usernameInput);
    } catch (error) {
      if (error.response.status === 404) setSearchError(404);
      else {
        setSearchError(400);
      }
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
          <ErrorText>Algo deu errado</ErrorText>
        )
      ) : (
        <></>
      )}
      {user ? (
        <ResultView
          key={user.id}
          name={user.name}
          login={user.login}
          avatar_url={user.avatar_url}
          locale={user.location}
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
