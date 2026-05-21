import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomNavbar from "./BottomNavbar";
import BookListScreen from '../screens/BookListScreen';
import InputBookScreen from '../screens/InputBookScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={BottomNavbar} />
                <Stack.Screen name="BookList" component={BookListScreen} />
                <Stack.Screen name="InputBook" component={InputBookScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}