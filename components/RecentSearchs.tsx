import React, { useState } from "react";
import { GestureResponderEvent } from "react-native";
import styled from "styled-components/native";
import { Animated } from "react-native";

type Props = {
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
};

const RecentSearchs = (props: Props) => {
  return (
    <>
    </>
  );
};

export default RecentSearchs;

const NiceButton = styled.Button`
  width: 50px;
  height: 50px;
  background-color: white;
`;

const StyledRecentSearchs = styled.View<{ $stage?: string }>`
  position: absolute;
  height: 80%;
  width: 90%;
  background-color: #009090;
`;

// const handleNiceButton = (event: GestureResponderEvent) => {
//     event.preventDefault();
//     props.stage !== "top" ? props.setStage("top") : props.setStage("bottom");
//   };
