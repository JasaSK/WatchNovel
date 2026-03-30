import { TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";

export default function RecommendedCard({ item }) {
  return (
    <TouchableOpacity style={globalStyles.recommendedCard}>
      <Image source={item.image} style={globalStyles.recommendedImage} />

      <Text style={globalStyles.recommendedTitle} numberOfLines={2}>
        {item.title}
      </Text>

      <Text style={globalStyles.recommendedAuthor}>{item.author}</Text>

      <View style={globalStyles.recommendedRating}>
        <Ionicons name="star" size={12} color="#FFD700" />
        <Text style={globalStyles.recommendedRatingText}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );
}
