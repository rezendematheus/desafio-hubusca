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
  public_repos: number;
};

export type repo = {
  created_at: string;
  name: string;
  pushed_at: string;
  html_url: string;
  description: string;
  language: string;
}

type StackParamList = {
  Main: undefined;
  Profile: {user: user};
}

export type MainProps = NativeStackScreenProps<StackParamList, 'Main', 'Stack'>

export type ProfileProps = NativeStackScreenProps<StackParamList, 'Profile', 'Stack'>

