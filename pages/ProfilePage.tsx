import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import type { ProfileProps, repo } from "../types";

import github_instance from "../api/api.github";
import UserInfoView from "../components/UserInfoView";

const ProfilePage = ({ route, navigation }: ProfileProps) => {
  const { user } = route.params;
  const [userState, setUserState] = useState(user);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchRepos(userState.login, setRepos);
  }, []);

  return (
    <Container>
      <ScrollableContainer>
       <UserInfoView userState={userState}/>
      </ScrollableContainer>
    </Container>
  );
};

const fetchRepos = async (
  username: string,
  setRepos: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const { data } = await github_instance.get(`/users/${username}/repos`);

    const repos = data.map((repo) => {
      return {
        name: repo.name,
        description: repo.description,
        created_at: repo.created_at,
        html_url: repo.html_url,
        pushed_at: repo.pushed_at,
        language: repo.language,
      };
    });
    setRepos(repos);
  } catch (error) {
    console.log(error);
  }
};

const ScrollableContainer = styled.ScrollView`
  width: 90%;
`;

const Container = styled.View`
  flex: 1;
  display: flex;
  width: 100%;
  background-color: #0d1117;
  align-items: center;
  padding-top: 50px;
`;



export default ProfilePage;
