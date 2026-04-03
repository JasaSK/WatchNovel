import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";

export default function ProfileStats({
  booksRead,
  readingGoal,
  readingStreak,
  isEditing,
  onUpdateGoal,
  tempGoal,
}) {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalValue, setGoalValue] = useState(
    tempGoal?.toString() || readingGoal.toString(),
  );

  const handleGoalUpdate = () => {
    const newGoal = parseInt(goalValue);
    if (!isNaN(newGoal) && newGoal > 0) {
      onUpdateGoal(newGoal);
    }
    setIsEditingGoal(false);
  };

  const progress = (booksRead / readingGoal) * 100;

  return (
    <View style={globalStyles.statsContainer}>
      <View style={globalStyles.statCard}>
        <Ionicons name="book-outline" size={28} color="#2200ff" />
        <Text style={globalStyles.statNumber}>{booksRead}</Text>
        <Text style={globalStyles.statLabel}>Books Read</Text>
      </View>

      <View style={globalStyles.statCard}>
        <View style={globalStyles.goalHeader}>
          <Ionicons name="flag-outline" size={28} color="#2200ff" />
          {isEditing && !isEditingGoal && (
            <TouchableOpacity
              onPress={() => setIsEditingGoal(true)}
              style={globalStyles.editGoalButton}
            >
              <Ionicons name="create-outline" size={16} color="#2200ff" />
            </TouchableOpacity>
          )}
        </View>

        {isEditingGoal ? (
          <View style={globalStyles.goalInputContainer}>
            <TextInput
              style={globalStyles.goalInput}
              value={goalValue}
              onChangeText={setGoalValue}
              keyboardType="numeric"
              autoFocus
              onSubmitEditing={handleGoalUpdate}
            />
            <TouchableOpacity onPress={handleGoalUpdate}>
              <Ionicons name="checkmark" size={20} color="#2200ff" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={globalStyles.statNumber}>{readingGoal}</Text>
            <Text style={globalStyles.statLabel}>Yearly Goal</Text>
          </>
        )}

        <View style={globalStyles.progressContainer}>
          <View
            style={[globalStyles.progressFillStat, { width: `${progress}%` }]}
          />
        </View>
        <Text style={globalStyles.progressPercentage}>
          {Math.round(progress)}%
        </Text>
      </View>

      <View style={globalStyles.statCard}>
        <Ionicons name="flame-outline" size={28} color="#2200ff" />
        <Text style={globalStyles.statNumber}>{readingStreak}</Text>
        <Text style={globalStyles.statLabel}>Day Streak</Text>
      </View>
    </View>
  );
}
