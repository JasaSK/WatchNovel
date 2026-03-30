import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";

export default function CategoryItem({ item }) {
  return (
    <TouchableOpacity style={globalStyles.categoryItem}>
      <View style={globalStyles.categoryIcon}>
        <Ionicons name={item.icon} size={24} color="#2200ff" />
      </View>
      <Text style={globalStyles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
}
