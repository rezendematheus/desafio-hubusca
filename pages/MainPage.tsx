import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import github_instance from "../api/api.github";
import axios, { AxiosError } from "axios";

const fetchUser = async () => {
  try {
    const test = await github_instance.get("/users/rezendematheus");
    console.log(test.data.login);
    return test;
  } catch (error) {
    console.log(error);
  }
};

const MainPage = ({ navigation }) => {
  const [user, setUser] = useState("");
  fetchUser();
  return (
    <Container>
      <Title>MainPage</Title>
      <SearchBar />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text``;

const SearchBar = styled.TextInput``;

export default MainPage;
