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
import { Dimensions, Touchable, TouchableOpacity } from "react-native";

type Props = {
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  userList?: user[];
  resultUserId?: number;
  navigation;
};

const screenHeight = Dimensions.get("window").height;

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
      <ScrollView nestedScrollEnabled={true} scrollEnabled={true}>
        <ReverseView>
          {props.userList ? (
            <>
              {props.userList.map((user) =>
                user.id !== props?.resultUserId ? (
                  <RecentResultView
                    key={user.login}
                    user={user}
                    navigation={props.navigation}
                  />
                ) : (
                  <Fragment key={user.id}></Fragment>
                )
              )}
            </>
          ) : (
            <>Não há buscas recentes</>
          )}
        </ReverseView>
      </ScrollView>
    </AnimatedStyledRecentSearchs>
  );
};

export default RecentSearchs;

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

const ScrollView = styled.ScrollView`
  height: max;
`;

const ReverseView = styled.View`
  display: flex;
  flex: 60px;
  flex-direction: column-reverse;
  align-items: center;
`;

const StyledRecentSearchs = styled.View`
  height: 100%;
  position: absolute;
  width: 90%;
  background-color: rgba(13, 17, 23, 0.9);
`;

const TouchSurface = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  width: 100%;
`;
