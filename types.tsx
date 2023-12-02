import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type user = {
  login: string;
  name: string;
  id: number;
  avatar_url: string;
  url: string;
  repos_url: string;
  location: string;
  followers: number;
  following: number;
};

type StackParamList = {
  Main: undefined;
  Profile: {user: user};
}

export type MainProps = NativeStackScreenProps<StackParamList, 'Main', 'Stack'>

export type ProfileProps = NativeStackScreenProps<StackParamList, 'Profile', 'Stack'>

