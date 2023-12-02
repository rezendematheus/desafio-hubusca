import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack/src/types";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={ScreenOptions}
          name="Main"
          component={MainPage}
        />
        <Stack.Screen
          options={ScreenOptions}
          name="Profile"
          component={ProfilePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ScreenOptions: NativeStackNavigationOptions = {
  title: "HUBusca",
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#010409",
  },
  headerTitleStyle: {
    fontSize: 40,
    color: "#FFFFFF",
  },
};
