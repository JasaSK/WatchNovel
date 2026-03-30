import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import ReleaseItem from "./ReleaseItem";

export default function ReleaseDayCard({ dayData }) {
  const [expanded, setExpanded] = useState(true);

  if (!dayData?.novels) return null;

  const released = dayData.novels.filter(
    (n) => n?.status === "released",
  ).length;
  const upcoming = dayData.novels.filter(
    (n) => n?.status === "upcoming",
  ).length;
  const delayed = dayData.novels.filter((n) => n?.status === "delayed").length;

  return (
    <View style={globalStyles.dayCard}>
      <TouchableOpacity
        style={globalStyles.dayHeader}
        activeOpacity={0.7}
        onPress={() => setExpanded(!expanded)}
      >
        <View>
          <Text style={globalStyles.dayName}>{dayData.day ?? "Hari"}</Text>
          <Text style={globalStyles.dayDate}>{dayData.date ?? ""}</Text>
        </View>

        <View style={globalStyles.dayStats}>
          {released > 0 && (
            <View
              style={[globalStyles.statBadge, globalStyles.statBadgeReleased]}
            >
              <Text style={globalStyles.statText}>{released}</Text>
            </View>
          )}

          {upcoming > 0 && (
            <View
              style={[globalStyles.statBadge, globalStyles.statBadgeUpcoming]}
            >
              <Text style={globalStyles.statText}>{upcoming}</Text>
            </View>
          )}

          {delayed > 0 && (
            <View
              style={[globalStyles.statBadge, globalStyles.statBadgeDelayed]}
            >
              <Text style={globalStyles.statText}>{delayed}</Text>
            </View>
          )}

          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={globalStyles.dayContent}>
          {dayData.novels.map((novel) => (
            <ReleaseItem key={novel.id} item={novel} />
          ))}
        </View>
      )}
    </View>
  );
}
