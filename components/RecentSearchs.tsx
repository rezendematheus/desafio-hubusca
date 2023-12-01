import React, { useState } from "react";
import styled from "styled-components/native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native";
import RecentResultView from "./RecentResultView";
type Props = {
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
};

const RecentSearchs = (props: Props) => {
  const menuPosition = useSharedValue(-650);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      bottom: withTiming(menuPosition.value, config),
    };
  });

  const AnimatedStyledRecentSearchs =
    Animated.createAnimatedComponent(StyledRecentSearchs);

  return (
    <AnimatedStyledRecentSearchs style={[style]}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (props.stage !== "top") {
            menuPosition.value = -50;
            props.setStage("top");
          } else {
            menuPosition.value = -800;
            props.setStage("bottom");
          }
        }}
      >
        <RecentHeader>
            <HeaderText>
                Perfis vistos recentemente
            </HeaderText>
            <HeaderIcon title='icon'/>
        </RecentHeader>
      </TouchableWithoutFeedback>
      <RecentResultView />
    </AnimatedStyledRecentSearchs>
  );
};

export default RecentSearchs;

const NiceButton = styled.Button`
  width: 50px;
  height: 50px;
  background-color: white;
`;

const RecentHeader = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const HeaderText = styled.Text`
    color: white;
    font-size: 16px;
`

const HeaderIcon = styled.Button`
    
`

const StyledRecentSearchs = styled.View<{ $stage?: string }>`
  position: absolute;
  height: 100%;
  width: 90%;
  background-color: rgba(13,17,23,0.9);
`;