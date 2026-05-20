import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HistoryScreen from "../screens/HistoryScreen";
import LibraryScreen from "../screens/LibraryScreen";

const Tab = createBottomTabNavigator();

export default function BottomNavbar() {
  const icons = {
    Home: ["home", "home-outline"],
    Schedule: ["calendar", "calendar-outline"],
    History: ["time", "time-outline"],
    Library: ["bookmark", "bookmark-outline"],
    Profile: ["person", "person-outline"],
  };

  const badgeStyle = {
    fontSize: 9,
    fontWeight: "bold",
    top: -2,
    right: -5,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = focused
            ? icons[route.name][0]
            : icons[route.name][1];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2200ff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          borderTopWidth: 1,
          borderTopColor: "rgba(34,0,255,0.1)",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Beranda" }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarLabel: "Jadwal",
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            ...badgeStyle,
            backgroundColor: "#ff4444",
            color: "#fff",
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ tabBarLabel: "Riwayat" }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: "Library",
          tabBarBadge: 5,
          tabBarBadgeStyle: {
            ...badgeStyle,
            backgroundColor: "#2200ff",
            color: "#fff",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profil" }}
      />
    </Tab.Navigator>
  );
}