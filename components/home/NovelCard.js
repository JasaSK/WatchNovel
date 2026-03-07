import { TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";

export default function NovelCard({ item }) {
  return (
    <TouchableOpacity style={globalStyles.novelCard}>
      <Image source={item.image} style={globalStyles.novelImage} />

      <View style={globalStyles.novelInfo}>
        <Text style={globalStyles.novelTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={globalStyles.novelAuthor}>{item.author}</Text>

        <View style={globalStyles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={globalStyles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
