import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

export default function SectionHeader({ title, onSeeAll }) {
  return (
    <View style={globalStyles.sectionHeader}>
      <Text style={globalStyles.sectionTitle}>{title}</Text>

      <TouchableOpacity onPress={onSeeAll}>
        <Text style={globalStyles.seeAllText}>See All</Text>
      </TouchableOpacity>
    </View>
  );
}
