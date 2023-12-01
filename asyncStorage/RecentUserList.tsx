import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "../types";

const fetchLocalRecentList = async (
  setRecentUserList: (value: React.SetStateAction<user[]>) => void
) => {
  try {
    const value = await AsyncStorage.getItem("RECENTSEARCHS");
    if (value !== null) {
      const list = JSON.parse(value) as user[];

      setRecentUserList(list);
    }
  } catch (error) {
    console.log(error);
  }
};

const storeLocalRecentList = async (userArr: user[]) => {
  try {
    await AsyncStorage.setItem("RECENTSEARCHS", JSON.stringify(userArr));
  } catch (error) {
    console.log(error);
  }
};

export {fetchLocalRecentList, storeLocalRecentList}
