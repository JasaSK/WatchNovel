import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileField({
  label,
  value,
  onChangeText,
  icon,
  isEditing,
  multiline = false,
  keyboardType = "default",
}) {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldLabelContainer}>
        <Ionicons name={icon} size={18} color="#666" />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>

      {isEditing ? (
        <TextInput
          style={[styles.fieldInput, multiline && styles.fieldInputMultiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#999"
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  fieldValue: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 4,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  fieldInputMultiline: {
    minHeight: 70,
    textAlignVertical: "top",
  },
});