import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import ProfileField from "../components/profile/ProfileField";
import ProfileStats from "../components/profile/ProfileStats";
import MenuItem from "../components/profile/MenuItem";
import { animations, useScaleAnimation } from "../utils/animations";

const AnimatedMenuItem = ({ item, index, onPress, onToggle }) => {
  const translateX = useRef(new Animated.Value(-30)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { scale, scalePress, scaleReset } = useScaleAnimation(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      animations.parallel([
        animations.fadeIn(opacity, 400, index * 50),
        animations.slideInLeft(translateX, 400, index * 50),
      ]).start();
    }, 600);
    return () => clearTimeout(timeout);
  }, [index]);

  const handlePressIn = () => scalePress(0.98);
  const handlePressOut = () => scaleReset();

  return (
    <Animated.View style={{ transform: [{ translateX }, { scale }], opacity }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <MenuItem
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
          isToggle={item.isToggle}
          toggleValue={item.toggleValue}
          onToggle={onToggle}
          isDestructive={item.isDestructive}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const MENU_ITEMS = {
  main: [
    { id: 1, icon: "book-outline", title: "My Library", subtitle: "View all your books" },
    { id: 2, icon: "add-circle-outline", title: "List Buku", subtitle: "Data buku" },
    { id: 3, icon: "heart-outline", title: "Favorites", subtitle: "Your saved novels" },
    { id: 4, icon: "time-outline", title: "Reading History", subtitle: "Recently viewed novels" },
    { id: 5, icon: "download-outline", title: "Downloads", subtitle: "Offline content" },
  ],
  preferences: [
    { id: 6, icon: "moon-outline", title: "Dark Mode", isToggle: true },
    { id: 7, icon: "notifications-outline", title: "Notifications", isToggle: true },
    { id: 8, icon: "language-outline", title: "Language", subtitle: "English" },
  ],
  support: [
    { id: 10, icon: "help-circle-outline", title: "Help & Support", subtitle: "FAQ, Contact us" },
    { id: 11, icon: "information-circle-outline", title: "About", subtitle: "Version 1.0.0" },
  ],
  danger: [
    { id: 12, icon: "log-out-outline", title: "Logout", isDestructive: true },
    { id: 13, icon: "trash-outline", title: "Delete Account", isDestructive: true },
  ],
};

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

  const animationsRef = {
    header: {
      opacity: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(-50)).current,
    },
    profileImage: {
      scale: useRef(new Animated.Value(0.5)).current,
      opacity: useRef(new Animated.Value(0)).current,
    },
    profileInfo: {
      translateY: useRef(new Animated.Value(30)).current,
      opacity: useRef(new Animated.Value(0)).current,
    },
    buttons: {
      edit: useRef(new Animated.Value(1)).current,
      back: useRef(new Animated.Value(1)).current,
    },
    stats: {
      scale: useRef(new Animated.Value(0.8)).current,
    },
    menuTitle: {
      translateX: useRef(new Animated.Value(-20)).current,
      opacity: useRef(new Animated.Value(0)).current,
    },
  };

  useEffect(() => {
    animations.parallel([
      animations.fadeIn(animationsRef.header.opacity, 600),
      animations.slideInUp(animationsRef.header.translateY, 600),
    ]).start();

    Animated.parallel([
      Animated.spring(animationsRef.profileImage.scale, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
      animations.fadeIn(animationsRef.profileImage.opacity, 500),
    ]).start();

    setTimeout(() => {
      animations.parallel([
        animations.fadeIn(animationsRef.profileInfo.opacity, 500),
        animations.slideInUp(animationsRef.profileInfo.translateY, 500),
      ]).start();
    }, 300);

    setTimeout(() => {
      Animated.spring(animationsRef.stats.scale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, 500);

    setTimeout(() => {
      animations.parallel([
        animations.fadeIn(animationsRef.menuTitle.opacity, 400),
        animations.slideInLeft(animationsRef.menuTitle.translateX, 400),
      ]).start();
    }, 600);
  }, []);

  // Fungsi navigasi yang terpisah
  const handleNavigation = (itemTitle) => {
    console.log("Navigating to:", itemTitle);

    switch (itemTitle) {
      case "List Buku":
        const stackNav = navigation.getParent();
        if (stackNav) {
          stackNav.navigate("BookList");
        } else {
          Alert.alert("Error", "Cannot navigate to List Book");
        }
        break;

      case "My Library":
        navigation.getParent()?.navigate("MainTabs", {
          screen: "Library",
        });
        break;

      case "Logout":
        handleLogout();
        break;

      case "Delete Account":
        handleDeleteAccount();
        break;

      default:
        Alert.alert(itemTitle, `Navigate to ${itemTitle.toLowerCase()}`);
    }
  };

  const handleEdit = () => {
    const animateButton = () => {
      return Animated.sequence([
        Animated.timing(animationsRef.buttons.edit, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(animationsRef.buttons.edit, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    };

    if (isEditing) {
      animateButton();
      setUserData({ ...tempData });
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } else {
      animateButton();
      setTempData({ ...userData });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    Animated.sequence([
      Animated.timing(animationsRef.buttons.edit, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animationsRef.buttons.edit, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
    setTempData({ ...userData });
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackPress = () => {
    Animated.sequence([
      Animated.timing(animationsRef.buttons.back, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animationsRef.buttons.back, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  const handleToggleWithAnimation = (setter, value) => {
    Animated.spring(animationsRef.buttons.edit, {
      toValue: 0.95,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.spring(animationsRef.buttons.edit, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
      setter(!value);
    }, 100);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          Alert.alert("Logged out", "You have been logged out successfully");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "This action cannot be undone. Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          Alert.alert("Account Deleted", "Your account has been deleted");
        },
      },
    ]);
  };

  const renderProfileInfo = () => {
    if (isEditing) {
      return (
        <View style={globalStyles.editFieldsContainer}>
          <ProfileField label="Name" value={tempData.name} onChangeText={(text) => handleFieldChange("name", text)} icon="person-outline" isEditing={isEditing} />
          <ProfileField label="Email" value={tempData.email} onChangeText={(text) => handleFieldChange("email", text)} icon="mail-outline" isEditing={isEditing} keyboardType="email-address" />
          <ProfileField label="Bio" value={tempData.bio} onChangeText={(text) => handleFieldChange("bio", text)} icon="chatbubble-outline" isEditing={isEditing} multiline />
        </View>
      );
    }

    return (
      <>
        <Text style={globalStyles.profileName}>{userData.name}</Text>
        <Text style={globalStyles.profileBio}>{userData.bio}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
          <Ionicons name="calendar-outline" size={14} color="#999" />
          <Text style={globalStyles.profileJoinDate}> {userData.joinDate}</Text>
        </View>
      </>
    );
  };

  const renderMenuSection = (title, items, startIndex) => {
    if (!items.length) return null;

    return (
      <>
        <Animated.View style={{ transform: [{ translateX: animationsRef.menuTitle.translateX }], opacity: animationsRef.menuTitle.opacity }}>
          <Text style={globalStyles.menuSectionTitle}>{title}</Text>
        </Animated.View>

        {items.map((item, idx) => (
          <AnimatedMenuItem
            key={item.id}
            item={{
              ...item,
              toggleValue: item.title === "Dark Mode" ? isDarkMode : notificationsEnabled,
              onToggle:
                item.title === "Dark Mode"
                  ? () => handleToggleWithAnimation(setIsDarkMode, isDarkMode)
                  : item.title === "Notifications"
                    ? () => handleToggleWithAnimation(setNotificationsEnabled, notificationsEnabled)
                    : undefined,
            }}
            index={startIndex + idx}
            onPress={() => handleNavigation(item.title)}
          />
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100, paddingTop: 10 }}>
        <Animated.View style={[globalStyles.profileHeader, { opacity: animationsRef.header.opacity, transform: [{ translateY: animationsRef.header.translateY }] }]}>
          <Animated.View style={{ transform: [{ scale: animationsRef.buttons.back }] }}>
            <TouchableOpacity onPress={handleBackPress} style={globalStyles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </Animated.View>

          <Text style={globalStyles.profileHeaderTitle}>My Profile</Text>

          <Animated.View style={{ transform: [{ scale: animationsRef.buttons.edit }] }}>
            <TouchableOpacity onPress={handleEdit} style={globalStyles.editButton}>
              <Ionicons name={isEditing ? "checkmark-done" : "create-outline"} size={24} color="#2200ff" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <View style={globalStyles.profileImageContainer}>
          <Animated.View style={{ transform: [{ scale: animationsRef.profileImage.scale }], opacity: animationsRef.profileImage.opacity, alignItems: 'center' }}>
            <View style={globalStyles.profileImageWrapper}>
              <Image source={require("../../assets/default-cover.png")} style={globalStyles.profileImage} />
              {isEditing && (
                <TouchableOpacity style={globalStyles.changePhotoButton}>
                  <Ionicons name="camera" size={20} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          <Animated.View style={{ transform: [{ translateY: animationsRef.profileInfo.translateY }], opacity: animationsRef.profileInfo.opacity, width: '100%', alignItems: 'center' }}>
            {renderProfileInfo()}

            {isEditing && (
              <View style={globalStyles.editActions}>
                <TouchableOpacity style={globalStyles.cancelButton} onPress={handleCancel}>
                  <Text style={globalStyles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>

        <Animated.View style={{ transform: [{ scale: animationsRef.stats.scale }], marginTop: 20, marginBottom: 10 }}>
          <ProfileStats
            booksRead={userData.booksRead}
            readingGoal={userData.readingGoal}
            readingStreak={userData.readingStreak}
            isEditing={isEditing}
            onUpdateGoal={(goal) => handleFieldChange("readingGoal", goal)}
            tempGoal={tempData.readingGoal}
          />
        </Animated.View>

        <View style={[globalStyles.menuSection, { marginBottom: 20 }]}>
          {renderMenuSection("Library", MENU_ITEMS.main, 0)}
          <View style={globalStyles.menuDivider} />
          {renderMenuSection("Preferences", MENU_ITEMS.preferences, MENU_ITEMS.main.length)}
          <View style={globalStyles.menuDivider} />
          {renderMenuSection("Support", MENU_ITEMS.support, MENU_ITEMS.main.length + MENU_ITEMS.preferences.length)}
          <View style={globalStyles.menuDivider} />
          {renderMenuSection("Account", MENU_ITEMS.danger, MENU_ITEMS.main.length + MENU_ITEMS.preferences.length + MENU_ITEMS.support.length)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}