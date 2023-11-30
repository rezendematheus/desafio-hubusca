import axios from "axios";

const baseUrl: string = process.env.EXPO_PUBLIC_GITHUB_API_URL;
const TOKEN: string = process.env.EXPO_PUBLIC_TOKEN;

const github_instance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: "Bearer " + TOKEN,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

export default github_instance;
