import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";

export default function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
  isToggle = false,
  toggleValue = false,
  onToggle,
  isDestructive = false,
}) {
  return (
    <TouchableOpacity
      style={globalStyles.menuItem}
      onPress={isToggle ? undefined : onPress}
      activeOpacity={isToggle ? 1 : 0.7}
    >
      <View style={globalStyles.menuItemLeft}>
        <Ionicons
          name={icon}
          size={24}
          color={isDestructive ? "#ff4444" : "#666"}
        />
        <View style={globalStyles.menuItemTextContainer}>
          <Text
            style={[
              globalStyles.menuItemTitle,
              isDestructive && globalStyles.menuItemDestructive,
            ]}
          >
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
          trackColor={{ false: "#ddd", true: "#2200ff" }}
          thumbColor="#fff"
        />
      ) : (
        <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );
}
