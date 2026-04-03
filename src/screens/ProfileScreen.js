import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import ProfileField from "../components/profile/ProfileField";
import ProfileStats from "../components/profile/ProfileStats";
import MenuItem from "../components/profile/MenuItem";

export default function ProfileScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Book lover | Novel enthusiast | Reading is my passion 📚",
    joinDate: "Joined March 2024",
    readingGoal: 50,
    booksRead: 32,
    readingStreak: 15,
  });

  const [tempData, setTempData] = useState({ ...userData });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      setUserData({ ...tempData });
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } else {
      // Enter edit mode
      setTempData({ ...userData });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setTempData({ ...userData });
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Add your logout logic here
          Alert.alert("Logged out", "You have been logged out successfully");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert("Account Deleted", "Your account has been deleted");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER WITH BACK BUTTON */}
        <View style={globalStyles.profileHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={globalStyles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={globalStyles.profileHeaderTitle}>My Profile</Text>

          <TouchableOpacity
            onPress={handleEdit}
            style={globalStyles.editButton}
          >
            <Ionicons
              name={isEditing ? "checkmark-done" : "create-outline"}
              size={24}
              color="#2200ff"
            />
          </TouchableOpacity>
        </View>

        {/* PROFILE IMAGE & BASIC INFO */}
        <View style={globalStyles.profileImageContainer}>
          <View style={globalStyles.profileImageWrapper}>
            <Image
              source={require("../../assets/default-cover.png")}
              style={globalStyles.profileImage}
            />
            {isEditing && (
              <TouchableOpacity style={globalStyles.changePhotoButton}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <View style={globalStyles.editFieldsContainer}>
              <ProfileField
                label="Name"
                value={tempData.name}
                onChangeText={(text) => handleFieldChange("name", text)}
                icon="person-outline"
                isEditing={isEditing}
              />
              <ProfileField
                label="Email"
                value={tempData.email}
                onChangeText={(text) => handleFieldChange("email", text)}
                icon="mail-outline"
                isEditing={isEditing}
                keyboardType="email-address"
              />
              <ProfileField
                label="Bio"
                value={tempData.bio}
                onChangeText={(text) => handleFieldChange("bio", text)}
                icon="chatbubble-outline"
                isEditing={isEditing}
                multiline
              />
            </View>
          ) : (
            <>
              <Text style={globalStyles.profileName}>{userData.name}</Text>
              <Text style={globalStyles.profileBio}>{userData.bio}</Text>
              <Text style={globalStyles.profileJoinDate}>
                <Ionicons name="calendar-outline" size={14} color="#999" />{" "}
                {userData.joinDate}
              </Text>
            </>
          )}

          {isEditing && (
            <View style={globalStyles.editActions}>
              <TouchableOpacity
                style={globalStyles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={globalStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* STATS SECTION */}
        <ProfileStats
          booksRead={userData.booksRead}
          readingGoal={userData.readingGoal}
          readingStreak={userData.readingStreak}
          isEditing={isEditing}
          onUpdateGoal={(goal) => handleFieldChange("readingGoal", goal)}
          tempGoal={tempData.readingGoal}
        />

        {/* MENU SECTION */}
        <View style={globalStyles.menuSection}>
          <Text style={globalStyles.menuSectionTitle}>Settings</Text>

          <MenuItem
            icon="book-outline"
            title="My Library"
            subtitle="View all your books"
            onPress={() => Alert.alert("My Library", "Navigate to library")}
          />

          <MenuItem
            icon="heart-outline"
            title="Favorites"
            subtitle="Your saved novels"
            onPress={() => Alert.alert("Favorites", "Navigate to favorites")}
          />

          <MenuItem
            icon="time-outline"
            title="Reading History"
            subtitle="Recently viewed novels"
            onPress={() =>
              Alert.alert("Reading History", "Navigate to history")
            }
          />

          <MenuItem
            icon="download-outline"
            title="Downloads"
            subtitle="Offline content"
            onPress={() => Alert.alert("Downloads", "Navigate to downloads")}
          />

          <View style={globalStyles.menuDivider} />

          <MenuItem
            icon="moon-outline"
            title="Dark Mode"
            isToggle={true}
            toggleValue={isDarkMode}
            onToggle={() => setIsDarkMode(!isDarkMode)}
          />

          <MenuItem
            icon="notifications-outline"
            title="Notifications"
            isToggle={true}
            toggleValue={notificationsEnabled}
            onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
          />

          <MenuItem
            icon="language-outline"
            title="Language"
            subtitle="English"
            onPress={() => Alert.alert("Language", "Change language")}
          />

          <View style={globalStyles.menuDivider} />

          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="FAQ, Contact us"
            onPress={() => Alert.alert("Help", "Navigate to help")}
          />

          <MenuItem
            icon="information-circle-outline"
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => Alert.alert("About", "App information")}
          />

          <MenuItem
            icon="log-out-outline"
            title="Logout"
            isDestructive={true}
            onPress={handleLogout}
          />

          <MenuItem
            icon="trash-outline"
            title="Delete Account"
            isDestructive={true}
            onPress={handleDeleteAccount}
          />
        </View>

        {/* SPACE FOR NAVBAR */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
