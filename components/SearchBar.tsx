import styled from "styled-components/native";
import React from "react";
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";

type Props = {
  usernameInput: string;
  eventHandler: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => Promise<void>;
  setUsernameInput: React.Dispatch<React.SetStateAction<string>>;
  searchError: number;
};

const SearchBar = (props: Props) => {
  return (
    <StyledSearchBar
      $error={props.searchError}
      value={props.usernameInput}
      onEndEditing={props.eventHandler}
      onChangeText={props.setUsernameInput}
      placeholder="Digite o nome do usuário"
      inputMode="search"
    />
  );
};

const StyledSearchBar = styled.TextInput.attrs({
  placeholderTextColor: "#6E7681",
  textAlign: "center",
})<{ $error?: number }>`
  color: #ffffff;
  width: 90%;
  min-width: 200px;
  height: 50px;
  background-color: #010409;
  border-radius: 10px;
  border: 1px solid #6e7681;
  ${(props) => props.$error !==0 && "border-color: #f85149"}
`;

export default SearchBar;
