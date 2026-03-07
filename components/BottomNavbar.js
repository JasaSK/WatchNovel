import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import JadwalScreen from "../screens/JadwalScreen"; // Import screen jadwal
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomNavbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Jadwal") {
            iconName = focused ? "calendar" : "calendar-outline"; // Icon calendar untuk jadwal
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#2200ff",
        tabBarInactiveTintColor: "gray",

        // STYLE 1: Floating Tab Bar
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          borderRadius: 25,
          height: 60,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },

        // STYLE ICON
        tabBarIconStyle: {
          marginTop: 5,
        },

        // STYLE LABEL
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Beranda",
        }}
      />

      {/* JADWAL DI TENGAH DENGAN BADGE */}
      <Tab.Screen
        name="Jadwal"
        component={JadwalScreen}
        options={{
          tabBarLabel: "Jadwal",
          tabBarBadge: 3, // Badge notifikasi di tengah
          tabBarBadgeStyle: {
            backgroundColor: "#ff4444", // Warna merah untuk badge
            color: "white",
            fontSize: 10,
            fontWeight: "bold",
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profil",
        }}
      />
    </Tab.Navigator>
  );
}
