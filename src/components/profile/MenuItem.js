// components/profile/MenuItem.js
import { View, Text, TouchableOpacity, Switch, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";

export default function MenuItem({
  icon,
  title,
  subtitle,
  isToggle,
  toggleValue,
  onToggle,
  isDestructive
}) {
  return (
    <View style={globalStyles.menuItem}>
      <View style={globalStyles.menuItemLeft}>
        <Ionicons
          name={icon}
          size={24}
          color={isDestructive ? "#ff4444" : "#666"}
          style={globalStyles.menuItemIcon}
        />
        <View style={globalStyles.menuItemTextContainer}>
          <Text style={[
            globalStyles.menuItemTitle,
            isDestructive && globalStyles.menuItemTitleDestructive
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={globalStyles.menuItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>

      {isToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: "#e0e0e0", true: "#2200ff" }}
          thumbColor={Platform.OS === 'ios' ? "#fff" : toggleValue ? "#fff" : "#f4f3f4"}
        />
      ) : (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={isDestructive ? "#ff4444" : "#ccc"}
        />
      )}
    </View>
  );
}