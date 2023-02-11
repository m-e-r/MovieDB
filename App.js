import * as React from "react";
import {StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import MovieScreen from "./MovieScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={headerStyle} />
            <Stack.Screen name="Search" component={SearchScreen} options={headerStyle}
                          title='Search'/>
            <Stack.Screen name="Movie" component={MovieScreen} options={headerStyle}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const headerStyle = StyleSheet.create({
    headerStyle: {backgroundColor: '#000'},
    headerTitleStyle: {color: '#fff'},
});