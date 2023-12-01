import React, { Fragment, useState } from "react";
import styled from "styled-components/native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import RecentResultView from "./RecentResultView";
import type { user } from "../types";

type Props = {
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  userList?: user[];
  resultUserId?: number;
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
      <TouchSurface
        activeOpacity={1}
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
          <HeaderText>Perfis vistos recentemente</HeaderText>
          <HeaderIcon title="icon" />
        </RecentHeader>
      </TouchSurface>
      <ReverseView>
        {props.userList ? (
          <>
            {props.userList.map((user) =>
              user.id !== props?.resultUserId ? (
                <RecentResultView
                  key={user.login}
                  name={user.name}
                  login={user.login}
                  avatar_url={user.avatar_url}
                  locale={user.location}
                />
              ) : (
                <Fragment key={user.id}>

                </Fragment>
              )
            )}
          </>
        ) : (
          <>Não há buscas recentes</>
        )}
      </ReverseView>
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
`;

const HeaderIcon = styled.Button``;

const ReverseView = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

const StyledRecentSearchs = styled.View`
  position: absolute;
  height: 100%;
  width: 90%;
  background-color: rgba(13, 17, 23, 0.9);
`;

const TouchSurface = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  width: 100%;
`;
